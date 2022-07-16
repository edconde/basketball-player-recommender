import * as express from 'express';
import { PlayerRouter } from '.';

/**
 * Clase que genera el enrutado de la aplicación
 */
export class Routes {
  private static app: express.Application;

  private constructor() {}

  /**
   * Devuelve una instancia singleton del enrutado de la aplicación
   */
  public static getRoutes(): express.Application {
    if (!Routes.app) {
      Routes.app = express();
      Routes.routes();
    }
    return Routes.app;
  }

  /**
   * Asocia los endpoint base de cada módulo con su enrutador
   */
  private static routes(): void {
    // ruta del recurso players
    Routes.app.use('/players', PlayerRouter.getRouting());
  }
}
