import * as express from 'express';
import { PlayerController } from '../controllers';

/**
 * Clase que genera el enrutado para el módulo del recurso players
 */
export class PlayerRouter {
  private static router: express.Router;

  private constructor() {}

  /**
   * Devuelve una instancia singleton del enrutado del módulo de players
   */
  public static getRouting(): express.Router {
    if (!PlayerRouter.router) {
      PlayerRouter.router = express.Router();
      PlayerRouter.routes();
    }
    return PlayerRouter.router;
  }

  /**
   * Asocia cada endpoint con el método a ejecutar del controlador correspondiente
   */
  private static routes(): void {
    const playerController = new PlayerController();

    PlayerRouter.router.get('/', playerController.get);
    PlayerRouter.router.get('/:id', playerController.getById);
    PlayerRouter.router.get('/:id/recomendaciones', playerController.getPlayersRecomendadosById);
  }
}
