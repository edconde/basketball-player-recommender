from pymongo import MongoClient
import time

start = time.time()

# connect to MongoDB
client = MongoClient('') # Añadir URL a cluster de mongo db
# select database
db=client['tfm']
# select collection
collection_players=db['players']
collection_plus_minus=db['pairs_plus_minus']

numberOfClusters = 4

""" collection_players.update_many({}, { '$set': { \
    'Shared Time PG Cluster 0': 0, 'Plus/Minus PG Cluster 0': 0, \
    'Shared Time PG Cluster 1': 0, 'Plus/Minus PG Cluster 1': 0, \
    'Shared Time PG Cluster 2': 0, 'Plus/Minus PG Cluster 2': 0, \
    'Shared Time PG Cluster 3': 0, 'Plus/Minus PG Cluster 3': 0, \
    'Shared Time SG Cluster 0': 0, 'Plus/Minus SG Cluster 0': 0, \
    'Shared Time SG Cluster 1': 0, 'Plus/Minus SG Cluster 1': 0, \
    'Shared Time SG Cluster 2': 0, 'Plus/Minus SG Cluster 2': 0, \
    'Shared Time SG Cluster 3': 0, 'Plus/Minus SG Cluster 3': 0, \
    'Shared Time SF Cluster 0': 0, 'Plus/Minus SF Cluster 0': 0, \
    'Shared Time SF Cluster 1': 0, 'Plus/Minus SF Cluster 1': 0, \
    'Shared Time SF Cluster 2': 0, 'Plus/Minus SF Cluster 2': 0, \
    'Shared Time SF Cluster 3': 0, 'Plus/Minus SF Cluster 3': 0, \
    'Shared Time PF Cluster 0': 0, 'Plus/Minus PF Cluster 0': 0, \
    'Shared Time PF Cluster 1': 0, 'Plus/Minus PF Cluster 1': 0, \
    'Shared Time PF Cluster 2': 0, 'Plus/Minus PF Cluster 2': 0, \
    'Shared Time PF Cluster 3': 0, 'Plus/Minus PF Cluster 3': 0, \
    'Shared Time C Cluster 0': 0, 'Plus/Minus C Cluster 0': 0, \
    'Shared Time C Cluster 1': 0, 'Plus/Minus C Cluster 1': 0, \
    'Shared Time C Cluster 2': 0, 'Plus/Minus C Cluster 2': 0, \
    'Shared Time C Cluster 3': 0, 'Plus/Minus C Cluster 3': 0, \
        } }) """

for pareja in collection_plus_minus.find():

        playerAdocs = collection_players.find({'BasketballReference Player Id': pareja['PlayerA']})
        playerBdocs = collection_players.find({'BasketballReference Player Id': pareja['PlayerB']})

        for playerAdoc in playerAdocs:
            for playerBdoc in playerBdocs:
                for i in range(numberOfClusters):
                    playerA_position = playerAdoc['Position']
                    playerB_position = playerBdoc['Position']
                    collection_players.update_one({ '$and': [ \
                        { 'BasketballReference Player Id': playerAdoc['BasketballReference Player Id'] },
                        { 'Position': playerAdoc['Position'] } \
                        ]}, \
                        { '$inc': {\
                            'Shared Time ' + playerB_position + ' Cluster ' + str(i): pareja['Shared Time'], \
                            'Plus/Minus ' + playerB_position + ' Cluster ' + str(i): pareja['Plus/Minus'] * playerBdoc['Pertenencia Cluster ' + str(i)] \
                        }})
                    collection_players.update_one({ '$and': [ \
                        { 'BasketballReference Player Id': playerBdoc['BasketballReference Player Id'] },
                        { 'Position': playerBdoc['Position'] } \
                        ]}, \
                        { '$inc': {\
                            'Shared Time ' + playerA_position + ' Cluster ' + str(i): pareja['Shared Time'], \
                            'Plus/Minus ' + playerA_position + ' Cluster ' + str(i): pareja['Plus/Minus'] * playerAdoc['Pertenencia Cluster ' + str(i)] \
                        }})
            playerBdocs.rewind() # rebobinamos el cursor al principio


for player in collection_players.find():
    for position in ['PG','SG','SF','PF','C']:
        try:
            compatibilidadCluster0 = player['Plus/Minus ' + position + ' Cluster ' + str(0)] / player['Shared Time ' + position + ' Cluster ' + str(0)]
        except ZeroDivisionError:
            compatibilidadCluster0 = 0
        try:
            compatibilidadCluster1 = player['Plus/Minus ' + position + ' Cluster ' + str(1)] / player['Shared Time ' + position + ' Cluster ' + str(1)]
        except ZeroDivisionError:
            compatibilidadCluster1 = 0
        try:
            compatibilidadCluster2 = player['Plus/Minus ' + position + ' Cluster ' + str(2)] / player['Shared Time ' + position + ' Cluster ' + str(2)]
        except ZeroDivisionError:
            compatibilidadCluster2 = 0
        try:
            compatibilidadCluster3 = player['Plus/Minus ' + position + ' Cluster ' + str(3)] / player['Shared Time ' + position + ' Cluster ' + str(3)]
        except ZeroDivisionError:
            compatibilidadCluster3 = 0

        compatibilidadMinima = min([compatibilidadCluster0, compatibilidadCluster1, compatibilidadCluster2, compatibilidadCluster3])
        compatibilidadMaxima = max([compatibilidadCluster0, compatibilidadCluster1, compatibilidadCluster2, compatibilidadCluster3])

        # normalizamos la compatibilidad al rango entre 0 y 1
        try:
            compatibilidadNormalizadaCluster0 = (compatibilidadCluster0 - compatibilidadMinima) / (compatibilidadMaxima - compatibilidadMinima)
        except ZeroDivisionError:
            compatibilidadNormalizadaCluster0 = 0
        try:
            compatibilidadNormalizadaCluster1 = (compatibilidadCluster1 - compatibilidadMinima) / (compatibilidadMaxima - compatibilidadMinima)
        except ZeroDivisionError:
            compatibilidadNormalizadaCluster1 = 0
        try:
            compatibilidadNormalizadaCluster2 = (compatibilidadCluster2 - compatibilidadMinima) / (compatibilidadMaxima - compatibilidadMinima)
        except ZeroDivisionError:
            compatibilidadNormalizadaCluster2 = 0
        try:
            compatibilidadNormalizadaCluster3 = (compatibilidadCluster3 - compatibilidadMinima) / (compatibilidadMaxima - compatibilidadMinima)
        except ZeroDivisionError:
            compatibilidadNormalizadaCluster3 = 0

        collection_players.update_one({ '$and': [ \
                    { 'BasketballReference Player Id': player['BasketballReference Player Id'] },
                    { 'Position': player['Position'] } \
                    ]}, \
                    { '$set': {\
                        'Compatibilidad ' + position + ' Cluster ' + str(0): compatibilidadNormalizadaCluster0, \
                        'Compatibilidad ' + position + ' Cluster ' + str(1): compatibilidadNormalizadaCluster1, \
                        'Compatibilidad ' + position + ' Cluster ' + str(2): compatibilidadNormalizadaCluster2, \
                        'Compatibilidad ' + position + ' Cluster ' + str(3): compatibilidadNormalizadaCluster3, \
                    }})

end = time.time()
print('Tiempo de ejecución: ' + str(round(end-start,2)) + ' segundos')