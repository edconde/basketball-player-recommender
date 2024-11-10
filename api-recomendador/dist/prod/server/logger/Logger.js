"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
const environment_1 = require("../environment");
/**
 * Clase que almacena un logger (singleton) de log4js para la aplicación,
 * configurado según el entorno (development/production).
 */
class AppLogger {
    constructor() { }
    static getInstance() {
        if (!AppLogger.instance) {
            (0, log4js_1.configure)(AppLogger.CONFIG_PATH);
            AppLogger.instance = (0, log4js_1.getLogger)(environment_1.ENVIRONMENT['LOGGER_CATEGORY']);
        }
        return AppLogger.instance;
    }
}
AppLogger.CONFIG_PATH = './src/server/config/logger/log4js.json';
exports.default = AppLogger.getInstance();
//# sourceMappingURL=Logger.js.map