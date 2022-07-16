# -*- coding: utf-8 -*-
"""
Created on Mon Sep  27 22:13:33 2021

@author: Edgar
"""

import numpy as np
import pandas as pd

players_df = pd.read_csv("datos_jugadores/nba_players.csv")

number_of_columns = len(players_df.columns)
players_df.loc[players_df.Name == "Danilo Gallinari", "Intangibles"] = 100 # hay un error en 2kratings y Danilo Gallinari tiene 645 de valoración en intangibles
players_df.replace('--', np.NaN, inplace=True)
players_df[players_df.columns[5:number_of_columns-1]]= players_df[players_df.columns[5:number_of_columns-1]].astype('float').astype('Int32')

max_values_of_each_row = players_df[players_df.columns[5:number_of_columns-1]].max(axis=1)
players_df[players_df.columns[5:number_of_columns-1]] = \
    players_df[players_df.columns[5:number_of_columns-1]]\
        .apply(lambda x: x*100/max_values_of_each_row, axis=0)

players_df.rename(columns={'Position1':'Position'}, inplace=True)
secondaryPositionRows = []
for index, row in players_df.iterrows():
    if pd.isnull(row['Position2']) == False:
        secondaryPositionRow = row
        secondaryPositionRow['Position'] = secondaryPositionRow['Position2']
        secondaryPositionRows.append(secondaryPositionRow)

players_df = players_df.append(secondaryPositionRows)
players_df.drop(labels=['Position2'], axis=1, inplace=True)
players_df.sort_index(inplace=True)

players_df.to_csv('datos_jugadores/nba_players_preprocessed.csv', sep=',', index=0)

# Creamos un csv para cada posición
players_df[players_df.Position == 'PG'].to_csv('datos_jugadores/nba_pg_preprocessed.csv', sep=',', index=0)
players_df[players_df.Position == 'SG'].to_csv('datos_jugadores/nba_sg_preprocessed.csv', sep=',', index=0)
players_df[players_df.Position == 'SF'].to_csv('datos_jugadores/nba_sf_preprocessed.csv', sep=',', index=0)
players_df[players_df.Position == 'PF'].to_csv('datos_jugadores/nba_pf_preprocessed.csv', sep=',', index=0)
players_df[players_df.Position == 'C'].to_csv('datos_jugadores/nba_c_preprocessed.csv', sep=',', index=0)