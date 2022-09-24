import { configure, getLogger as getLog4jsLogger, Logger } from 'log4js';
import { ENVIRONMENT } from '../environment';

/**
 * Clase que almacena un logger (singleton) de log4js para la aplicación,
 * configurado según el entorno (development/production).
 */
class AppLogger {
  private constructor() {}

  private static readonly CONFIG_PATH =
    './src/server/config/logger/log4js.json';
  private static instance: Logger;

  static getInstance(): Logger {
    if (!AppLogger.instance) {
      configure(AppLogger.CONFIG_PATH);
      AppLogger.instance = getLog4jsLogger(ENVIRONMENT['LOGGER_CATEGORY']);
    }
    return AppLogger.instance;
  }
}

export default AppLogger.getInstance();
