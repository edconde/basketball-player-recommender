# basketball-player-recommender
Aplicación para recomendar pares de jugadores NBA complementarios

## Proyectos:
- Base de datos: Mongo DB 5.0
- Back end: NodeJS
- Front end: App web Angular

### Pasos para arrancar el proyecto en local:

- Back end:
    -   Requisitos: NodeJS y npm
    -   Ejecutar los siguientes comandos para levantar la aplicación en localhost:3000.
        -   npm install
        -   npm run start:dev
- Front end:
    -   Requisitos: NodeJs y npm
    -   Ejecutar los siguientes comandos para levantar la aplicación en localhost:4200.
        -   npm install
        -   ng serve --o
        
### Pasos para desplegar el proyecto:
- Back end:
    -   Requisitos: NodeJS, npm y Docker
    -   Generar imagen de Docker:
        -   docker build -t recomendador-api-image .
    -   Modificar el fichero api-recomendador/docker-compose-yml asignando los valores deseados a las siguientes variables de entorno
        -   MONGO_INITDB_ROOT_USERNAME
        -   MONGO_INITDB_ROOT_PASSWORD
        -   MONGODB_CONNECTION_STRING
        -   SSL-CERT-PATH
        -   SSL_CERT_CHAIN_PATH
        -   SSL-CERT-PRIVATE-KEY-PATH
    -   Si no se usa SSL, deshabilitarlo en el fichero api-recomendador/src/server/app.ts => método listen()
    -   Crear y ejecutar los contenedores con la aplicación NodeJS y la base de datos MongoDB mediante el comando:
        -   docker-compose up -d --no-build
    -   Importar los siguientes ficheros en MongoDB para poblar la base de datos 'test':
        -   db_backups/players.json (en colección 'players')
        -   db_backups/pairs_plus_minus.json (en colección 'pairs_plus_minus')

- Front end:
    -   Requisitos: NodeJs y npm
    -   Despliegue en GitHub Pages (https://edconde.github.io/basketball-player-recommender/):
        -   Desde la ruta /app-recomendador, Ejecutar los comandos 'npm install' y 'npm run deploy-github-pages'.
        -   Habilitar GitHub Pages para el repositorio en GitHub, configurando el despliegue desde la carpeta '/docs' de la rama 'main':
        ![image](https://user-images.githubusercontent.com/15130843/192156210-2ec04693-dcda-4e2e-b309-61cce9ee9581.png)

    -   Despliegue en un servidor:
        -   Desde la ruta /app-recomendador, Ejecutar los comandos 'npm install' y 'ng build --prod'.
        -   Subir los ficheros que se han generado en el directorio /dist/app-recomendador al servidor web de turno (por ejemplo, Apache).

#### Otros comandos útiles:
-   Copiar una imagen docker local a un servidor:
    -   'docker save recomendador-api-image | ssh -C username@host docker load'
-   Crear un contenedor a partir de la imagen sin usar docker-compose:
    -   'docker container create --name recomendador-api-container -p 3000:3000 recomendador-api-image'
