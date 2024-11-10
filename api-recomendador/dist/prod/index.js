"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./server/app");
const db_1 = require("./server/db");
const environment_1 = require("./server/environment");
const port = process.env.PORT || environment_1.ENVIRONMENT['PORT'];
console.log(process.env.PORT);
const app = new app_1.App(port);
// Arranque aplicación
app.listen();
// Conexión a base de datos
if (environment_1.ENVIRONMENT['ENVIRONMENT_NAME'] === 'PRODUCTION') {
    db_1.NbaDB.connect();
}
//# sourceMappingURL=index.js.map