"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express = require("express");
const _1 = require(".");
/**
 * Clase que genera el enrutado de la aplicación
 */
class Routes {
    constructor() { }
    /**
     * Devuelve una instancia singleton del enrutado de la aplicación
     */
    static getRoutes() {
        if (!Routes.app) {
            Routes.app = express();
            Routes.routes();
        }
        return Routes.app;
    }
    /**
     * Asocia los endpoint base de cada módulo con su enrutador
     */
    static routes() {
        // ruta del recurso players
        Routes.app.use('/players', _1.PlayerRouter.getRouting());
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map