from sklearn.cluster import KMeans
import pandas as pd
from pymongo import MongoClient
import time

start = time.time()
# connect to MongoDB
client = MongoClient('') # Añadir URL a cluster de mongo db
# select database
db=client['tfm']
# select collection
collection=db['players']
# empty collection
collection.delete_many({})

positions = ['pg','sg','sf','pf','c']
numberOfClusters = 4

for position in positions:
    players_df = pd.read_csv('datos_jugadores/nba_' + position + '_preprocessed.csv')
    train = players_df[['Defending','Rebounding','Outside Scoring','Inside Scoring','Playmaking','Athleticism']]
    km = KMeans(n_clusters=numberOfClusters)
    alldistances = km.fit_transform(train)
    # Pertenencias a clusters
    for i in range(numberOfClusters):
        distancesToCluster = [d[i] for d in alldistances]
        maxDistanceToCluster = max(distancesToCluster)
        minDistanceToCluster = min(distancesToCluster)
        players_df['Pertenencia Cluster ' + str(i)] = [1 - ((d-minDistanceToCluster)/(maxDistanceToCluster-minDistanceToCluster)) for d in distancesToCluster]

    # añadir columna de cluster al que más pertenece cada jugador
    #players_df['cluster'] = km.labels_

    # añadir jugadores a coleccion
    players_df_dict = players_df.to_dict('records')
    collection.insert_many(players_df_dict)

end = time.time()
print('Tiempo de ejecución: ' + str(round(end-start,2)) + ' segundos')