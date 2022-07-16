import pandas as pd
import numpy as np
from pymongo import MongoClient
import time
import requests
from bs4 import BeautifulSoup
import itertools
import copy

start = time.time()
basketballReferenceRootUrl = 'https://www.basketball-reference.com'

# connect to MongoDB
client = MongoClient('') # Añadir URL a cluster de mongo db
# select database
db=client['tfm']
# select collection
collection=db['pairs_plus_minus']

# Sólo nos interesan las columnas URL, EnterGame, LeaveGame, Quarter, SecLeft, HomeScore y AwayScore
col_list = ['URL', 'EnterGame', 'LeaveGame','Quarter', 'SecLeft', 'HomeScore', 'AwayScore']

games_df = pd.read_csv('datos_partidos/NBA_PBP_2020-21.csv', usecols=col_list, dtype = {'URL': str, 'EnterGame': str, 'LeaveGame': str, 'Quarter' : np.int32, 'SecLeft' : np.int32, 'HomeScore' : np.int32, 'AwayScore' : np.int32})

# inicio algoritmo obtención de información del más/menos por pares de jugadores
urlBoxscorePartidoActual = None
jugadoresLocal = []
jugadoresVisitante = []
jugadoresEnPistaLocal = []
jugadoresEnPistaVisitante = []
parejasDeJugadores = []
parejasDeJugadoresBackup = []
# cuando los cambios se hacen en un descanso entre cuartos, no salen en el registro así que necesitamos algunas variables para almacenar el estado en ese momento
jugadoresEnPistaLocalUltimoDescanso = []
jugadoresEnPistaVisitanteUltimoDescanso = []
homeScoreUltimoDescanso = 0
awayScoreUltimoDescanso = 0
cuartoActual = 1

def actualizarJugadores(urlBoxscorePartido):
    global jugadoresLocal, jugadoresVisitante, jugadoresEnPistaLocal, jugadoresEnPistaVisitante, parejasDeJugadores
    boxscorePageRequest = requests.get('https://www.basketball-reference.com' + urlBoxscorePartido)
    boxscorePage = BeautifulSoup(boxscorePageRequest.text, 'lxml')
    jugadoresEnPistaLocal = [playerLabel.select_one('th').a.get('href').split('/')[-1].split('.')[0] for playerLabel in boxscorePage.select('#content > div:nth-child(17) > div > div > div.table_container > table > tbody > tr')[0:5]]
    jugadoresEnPistaVisitante = [playerLabel.select_one('th').a.get('href').split('/')[-1].split('.')[0] for playerLabel in boxscorePage.select('#content > div:nth-child(9) > div > div > div.table_container > table > tbody > tr')[0:5]]
    jugadoresLocal = jugadoresEnPistaLocal + [playerLabel.select_one('th').a.get('href').split('/')[-1].split('.')[0] for playerLabel in boxscorePage.select('#content > div:nth-child(17) > div > div > div.table_container > table > tbody > tr')[6:]]
    jugadoresVisitante = jugadoresEnPistaVisitante + [playerLabel.select_one('th').a.get('href').split('/')[-1].split('.')[0] for playerLabel in boxscorePage.select('#content > div:nth-child(9) > div > div > div.table_container > table > tbody > tr')[6:]]
    parejasDeJugadores = [{ 'PlayerA': pareja[0], 'PlayerB': pareja[1], 'Shared Time': 0, 'Plus/Minus': 0, \
        'SecLeftInicioParcialCompartidoActual': 4*720, 'HomeScoreInicioUltimoParcialCompartido': 0, 'AwayScoreInicioUltimoParcialCompartido': 0 } \
        for pareja in list(itertools.combinations(jugadoresLocal, 2)) + list(itertools.combinations(jugadoresVisitante, 2))]

def persistirInformacionDePartido():
    for pareja in parejasDeJugadores:
        updateResult = collection.update_one({ '$or': [ \
            { '$and': [{ 'PlayerA': pareja['PlayerA']}, { 'PlayerB': pareja['PlayerB']}] }, \
            { '$and': [{ 'PlayerA': pareja['PlayerB']}, { 'PlayerB': pareja['PlayerA']}] } \
            ]}, \
            { '$inc' : { 'Shared Time': pareja['Shared Time'], 'Plus/Minus': pareja['Plus/Minus'] } } )
        if updateResult.matched_count == 0:
            collection.insert_one({ 'Shared Time': pareja['Shared Time'], 'Plus/Minus': pareja['Plus/Minus'], 'PlayerA': pareja['PlayerA'], 'PlayerB': pareja['PlayerB'] })

# Para cada fila del dataset
for index, row in games_df.iterrows():
    if row['URL'] != urlBoxscorePartidoActual:
        if urlBoxscorePartidoActual != None:
            # Si ha cambiado la url al partido y no era None es que acabamos de leer todas las filas de un partido, entonces persistimos a mongo la info que hemos obtenido del partido yreiniciamos algunas variables para empezar a leer el siguiente:
            cuartoActual = 1
            homeScoreUltimoDescanso = 0
            awayScoreUltimoDescanso = 0
            persistirInformacionDePartido()
        urlBoxscorePartidoActual = row['URL']
        actualizarJugadores(row['URL'])
    if row['Quarter'] != cuartoActual:
        cuartoActual = row['Quarter']
        jugadoresEnPistaLocalUltimoDescanso = jugadoresEnPistaLocal
        jugadoresEnPistaVisitanteUltimoDescanso = jugadoresEnPistaVisitante
        homeScoreUltimoDescanso = row['HomeScore']
        awayScoreUltimoDescanso = row['AwayScore']
    if row['EnterGame'] is not np.nan: # Sólo nos interesan las filas con información sobre sustituciones de jugadores
        playerIn = row['EnterGame'].split('-')[1].strip()
        playerOut = row['LeaveGame'].split('-')[1].strip()
        if playerOut in jugadoresLocal: # cambio en el equipo local
            try:
                jugadoresEnPistaLocal.remove(playerOut)
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerOut and pareja['PlayerB'] in jugadoresEnPistaLocal) \
                    or (pareja['PlayerB'] == playerOut and pareja['PlayerA'] in jugadoresEnPistaLocal), parejasDeJugadores):
                    parejasDeJugadoresBackup.append(copy.deepcopy(pareja))
                    pareja['Shared Time'] += pareja['SecLeftInicioParcialCompartidoActual'] - (row['SecLeft'] + 720 * (4 - row['Quarter']))
                    pareja['Plus/Minus'] += (row['HomeScore'] - pareja['HomeScoreInicioUltimoParcialCompartido']) - (row['AwayScore'] - pareja['AwayScoreInicioUltimoParcialCompartido'])
            except ValueError:
                # si jugadoresEnPistaLocal.remove(playerOut) lanza un ValueError es porque no se había registrado
                # la entrada al campo de playerOut (entró en un descanso entre cuartos)
                # entonces hay mínimo un jugador en jugadoresEnPistaLocalUltimoDescanso que salió del campo en el descanso (por eso guardamos un backup)
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerOut and pareja['PlayerB'] in jugadoresEnPistaLocalUltimoDescanso) \
                    or (pareja['PlayerB'] == playerOut and pareja['PlayerA'] in jugadoresEnPistaLocalUltimoDescanso), parejasDeJugadores):
                    parejasDeJugadoresBackup.append(copy.deepcopy(pareja))
                    pareja['SecLeftInicioParcialCompartidoActual'] = 720 + (720 * (4 - cuartoActual))
                    pareja['HomeScoreInicioUltimoParcialCompartido'] = homeScoreUltimoDescanso
                    pareja['AwayScoreInicioUltimoParcialCompartido'] = awayScoreUltimoDescanso
                    pareja['Shared Time'] += pareja['SecLeftInicioParcialCompartidoActual'] - (row['SecLeft'] + 720 * (4 - row['Quarter']))
                    pareja['Plus/Minus'] += (row['HomeScore'] - pareja['HomeScoreInicioUltimoParcialCompartido']) - (row['AwayScore'] - pareja['AwayScoreInicioUltimoParcialCompartido'])
            if playerIn in jugadoresEnPistaLocal:
                # si playerIn ya está en jugadoresEnPistaLocal, es que no se habia registrado la salida de playerIn del campo
                # asumimos que ha salido del campo en el anterior descanso entre cuartos (aunque podría haber sido en algún descanso todavía anterior)
                # primero actualizamos la información de mas/menos y minutos compartidos con los compañeros con los que estaba en pista antes de ese descanso
                companherosUltimoDescanso = [lambda j: j != playerIn, jugadoresEnPistaLocalUltimoDescanso]
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerIn and pareja['PlayerB'] in companherosUltimoDescanso) \
                    or (pareja['PlayerB'] == playerIn and pareja['PlayerA'] in companherosUltimoDescanso), parejasDeJugadores):
                        pareja['Shared Time'] += pareja['SecLeftInicioParcialCompartidoActual'] - (720 + (720 * (4 - cuartoActual)))
                        pareja['Plus/Minus'] += (homeScoreUltimoDescanso - pareja['HomeScoreInicioUltimoParcialCompartido']) - (awayScoreUltimoDescanso - pareja['AwayScoreInicioUltimoParcialCompartido'])
                # ahora corregimos las entradas que se hayan podido escribir por error cuando se capturo un ValueError al no haberse registrado la entrada al campo de playerOut
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerIn or pareja['PlayerB'] == playerIn) \
                    and (pareja['SecLeftInicioParcialCompartidoActual'] <= (720 + (720 * (4 - cuartoActual)))), parejasDeJugadores):
                        parejaBackup = next((p for p in parejasDeJugadoresBackup if p['PlayerA'] == pareja['PlayerA'] and p['PlayerB'] == pareja['PlayerB']), None)
                        if parejaBackup != None:
                            pareja = parejaBackup
                            parejasDeJugadoresBackup.remove(parejaBackup)
                jugadoresEnPistaLocal.remove(playerIn)
            for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerIn and pareja['PlayerB'] in jugadoresEnPistaLocal) \
                or (pareja['PlayerB'] == playerIn and pareja['PlayerA'] in jugadoresEnPistaLocal), parejasDeJugadores):    
                pareja['SecLeftInicioParcialCompartidoActual'] = row['SecLeft'] + 720 * (4 - row['Quarter'])
                pareja['HomeScoreInicioUltimoParcialCompartido'] = row['HomeScore']
                pareja['AwayScoreInicioUltimoParcialCompartido'] = row['AwayScore']
            jugadoresEnPistaLocal.append(playerIn)
        else: # cambio en el equipo visitante
            try:
                jugadoresEnPistaVisitante.remove(playerOut)
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerOut and pareja['PlayerB'] in jugadoresEnPistaVisitante) \
                    or (pareja['PlayerB'] == playerOut and pareja['PlayerA'] in jugadoresEnPistaVisitante), parejasDeJugadores):
                    parejasDeJugadoresBackup.append(copy.deepcopy(pareja))
                    pareja['Shared Time'] += pareja['SecLeftInicioParcialCompartidoActual'] - (row['SecLeft'] + 720 * (4 - row['Quarter']))
                    pareja['Plus/Minus'] += (row['AwayScore'] - pareja['AwayScoreInicioUltimoParcialCompartido']) - (row['HomeScore'] - pareja['HomeScoreInicioUltimoParcialCompartido'])
            except ValueError:
                # si jugadoresEnPistaVisitante.remove(playerOut) lanza un ValueError es porque no se había registrado
                # la entrada al campo de playerOut (entró en un descanso entre cuartos)
                # entonces hay mínimo un jugador en jugadoresEnPistaVisitanteUltimoDescanso que salió del campo en el descanso (por eso guardamos un backup)
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerOut and pareja['PlayerB'] in jugadoresEnPistaVisitanteUltimoDescanso) \
                    or (pareja['PlayerB'] == playerOut and pareja['PlayerA'] in jugadoresEnPistaVisitanteUltimoDescanso), parejasDeJugadores):
                    parejasDeJugadoresBackup.append(copy.deepcopy(pareja))
                    pareja['SecLeftInicioParcialCompartidoActual'] = 720 + (720 * (4 - cuartoActual))
                    pareja['HomeScoreInicioUltimoParcialCompartido'] = homeScoreUltimoDescanso
                    pareja['AwayScoreInicioUltimoParcialCompartido'] = awayScoreUltimoDescanso
                    pareja['Shared Time'] += pareja['SecLeftInicioParcialCompartidoActual'] - (row['SecLeft'] + 720 * (4 - row['Quarter']))
                    pareja['Plus/Minus'] += (row['AwayScore'] - pareja['AwayScoreInicioUltimoParcialCompartido']) - (row['HomeScore'] - pareja['HomeScoreInicioUltimoParcialCompartido'])
            if playerIn in jugadoresEnPistaVisitante:
                # si playerIn ya está en jugadoresEnPistaVisitante, es que no se habia registrado la salida de playerIn del campo
                # asumimos que ha salido del campo en el anterior descanso entre cuartos (aunque podría haber sido en algún descanso todavía anterior)
                # primero actualizamos la información de mas/menos y minutos compartidos con los compañeros con los que estaba en pista antes de ese descanso
                companherosUltimoDescanso = [lambda j: j != playerIn, jugadoresEnPistaVisitanteUltimoDescanso]
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerIn and pareja['PlayerB'] in companherosUltimoDescanso) \
                    or (pareja['PlayerB'] == playerIn and pareja['PlayerA'] in companherosUltimoDescanso), parejasDeJugadores):
                        pareja['Shared Time'] += pareja['SecLeftInicioParcialCompartidoActual'] - (720 + (720 * (4 - cuartoActual)))
                        pareja['Plus/Minus'] += (awayScoreUltimoDescanso - pareja['AwayScoreInicioUltimoParcialCompartido']) - (homeScoreUltimoDescanso - pareja['HomeScoreInicioUltimoParcialCompartido'])
                # ahora corregimos las entradas que se hayan podido escribir por error cuando se capturo un ValueError al no haberse registrado la entrada al campo de playerOut
                for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerIn or pareja['PlayerB'] == playerIn) \
                    and (pareja['SecLeftInicioParcialCompartidoActual'] <= (720 + (720 * (4 - cuartoActual)))), parejasDeJugadores):
                        parejaBackup = next((p for p in parejasDeJugadoresBackup if p['PlayerA'] == pareja['PlayerA'] and p['PlayerB'] == pareja['PlayerB']), None)
                        if parejaBackup != None:
                            pareja = parejaBackup
                            parejasDeJugadoresBackup.remove(parejaBackup)
                jugadoresEnPistaVisitante.remove(playerIn)
            for pareja in filter(lambda pareja: (pareja['PlayerA'] == playerIn and pareja['PlayerB'] in jugadoresEnPistaVisitante) \
                or (pareja['PlayerB'] == playerIn and pareja['PlayerA'] in jugadoresEnPistaVisitante), parejasDeJugadores):    
                pareja['SecLeftInicioParcialCompartidoActual'] = row['SecLeft'] + 720 * (4 - row['Quarter'])
                pareja['HomeScoreInicioUltimoParcialCompartido'] = row['HomeScore']
                pareja['AwayScoreInicioUltimoParcialCompartido'] = row['AwayScore']
            jugadoresEnPistaVisitante.append(playerIn)

end = time.time()
print('Tiempo de ejecución: ' + str(round(end-start,2)) + ' segundos')
