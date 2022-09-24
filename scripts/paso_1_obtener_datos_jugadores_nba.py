# -*- coding: utf-8 -*-
"""
Created on Mon Sep  27 22:13:33 2021

@author: Edgar
"""

import csv
import time
import requests
from bs4 import BeautifulSoup

# función para generar la fila con los nombres de columna
def get_header_row():
    playerPageRequest = requests.get('https://www.2kratings.com/trae-young')
    playerPage = BeautifulSoup(playerPageRequest.text, 'lxml')
    attributes = playerPage.select_one('#nav-attributes').select('.attribute-box')
    headerRow = ['Name','Team','Position1','Position2', 'Overall']
    for a in attributes:
        if 'mr-n1' in a.parent['class']: # atributo genérico (categoría de atributos), ej: a.parent.parent.text => '48 Rebounding'
            attributeValue = a.parent.parent.text.strip().split(' ')[0]
            headerValue = a.parent.parent.text.strip()[len(attributeValue) + 1:]
            headerRow.append(headerValue)
        else: # atributo específico., ej: a.parent.text => '40 Offensive Rebound'
            attributeValue = a.parent.text.strip().split(' ')[0]
            headerValue = a.parent.text.strip()[len(attributeValue) + 1:]
            headerRow.append(headerValue)
    return headerRow

def write_nba_players_csv():
    start = time.time()
    with open('datos_jugadores/nba_players.csv', 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        headerRow = get_header_row()
        writer.writerow(headerRow)
        homePageRequest = requests.get('https://www.2kratings.com/')
        homePage = BeautifulSoup(homePageRequest.text, 'lxml')
        
        teamsLabels = homePage.select_one('#ui-current-teams').findAll('li')
        for teamLabel in teamsLabels[1:]:
            teamName = teamLabel.text.strip()
            teamPageRequest = requests.get(teamLabel.a.get('href'))
            teamPage = BeautifulSoup(teamPageRequest.text, 'lxml')
            playersLabels = teamPage.select_one('body > div.outside-wrapper > div.inside-wrapper > ' + \
                                'div.wrapper.both-skin-adx > div.main > main > ' + \
                                'div:nth-child(2) > div.col-12.col-md-7.col-lg-7.col-xl-8 > ' + \
                                'div:nth-child(1) > div.row.no-gutters > div > ' + \
                                'div.ml-1.ml-xl-3.mr-1.mr-xl-3.mb-xl-3 > div > table > tbody') \
                .select('div.entries > a:nth-child(1)')
                
            for playerLabel in playersLabels:
                try:
                    playerPageRequest = requests.get(playerLabel.get('href'))
                    playerPage = BeautifulSoup(playerPageRequest.text, 'lxml')
                    
                    playerName = playerPage.select_one('body > div.outside-wrapper > div.inside-wrapper > div.wrapper.both-skin-adx > div.main > main > div > div.row.header.header-bg.mt-2.mb-5.ml-n2.mr-n2.mx-md-auto > div.col-8.col-md-5.player-info > h1').text.strip()
                    attributes = playerPage.select_one('#nav-attributes').select('.attribute-box')
                    positions = playerPage.select_one('body > div.outside-wrapper > div.inside-wrapper > div.wrapper.both-skin-adx > div.main > main > div > div.row.header.header-bg.mt-2.mb-5.ml-n2.mr-n2.mx-md-auto > div.col-8.col-md-5.player-info > div > p:nth-child(5)')\
                        .select('a')
                    position1 = positions[0].text.strip()
                    position2 = positions[1].text.strip() if len(positions) > 1 else None
                    overall = playerPage.select_one('body > div.outside-wrapper > div.inside-wrapper > div.wrapper.both-skin-adx > div.main > main > div > div:nth-child(3) > div.col-12.col-md-2.col-lg-2 > div > div > span').text.strip()
                    dataRow = [playerName, teamName, position1, position2, overall]
                    # primer jugador que añadimos, aprovechamos para escribir el header del csv
                    for a in attributes:
                        if 'mr-n1' in a.parent['class']: # atributo genérico (categoría de atributos), ej: a.parent.parent.text => '48 Rebounding'
                            attributeValue = a.parent.parent.text.strip().split(' ')[0]
                            #headerValue = a.parent.parent.text.strip()[len(attributeValue) + 1:]
                            dataRow.append(attributeValue) 
                        else: # atributo específico., ej: a.parent.text => '40 Offensive Rebound'
                            attributeValue = a.parent.text.strip().split(' ')[0]
                            #headerValue = a.parent.text.strip()[len(attributeValue) + 1:]
                            dataRow.append(attributeValue)
                    writer.writerow(dataRow)
                except:
                    continue
    
    end = time.time()
    print('Tiempo de ejecución: ' + str(round(end-start,2)) + ' segundos')

write_nba_players_csv()
