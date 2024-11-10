import { App } from './server/app';
import { NbaDB } from './server/db';
import { ENVIRONMENT } from './server/environment';

const port = process.env.PORT || ENVIRONMENT['PORT'];
console.log(port);
const app = new App(port);
// Arranque aplicación
app.listen();
// Conexión a base de datos
console.log(ENVIRONMENT['ENVIRONMENT_NAME']);
if (ENVIRONMENT['ENVIRONMENT_NAME'] === 'PRODUCTION') {
  NbaDB.connect();
}
