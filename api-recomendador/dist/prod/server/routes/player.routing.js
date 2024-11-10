"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRouter = void 0;
const express = require("express");
const controllers_1 = require("../controllers");
/**
 * Clase que genera el enrutado para el módulo del recurso players
 */
class PlayerRouter {
    constructor() { }
    /**
     * Devuelve una instancia singleton del enrutado del módulo de players
     */
    static getRouting() {
        if (!PlayerRouter.router) {
            PlayerRouter.router = express.Router();
            PlayerRouter.routes();
        }
        return PlayerRouter.router;
    }
    /**
     * Asocia cada endpoint con el método a ejecutar del controlador correspondiente
     */
    static routes() {
        const playerController = new controllers_1.PlayerController();
        PlayerRouter.router.get('/', playerController.get);
        PlayerRouter.router.get('/:id', playerController.getById);
        PlayerRouter.router.get('/:id/recomendaciones', playerController.getPlayersRecomendadosById);
    }
}
exports.PlayerRouter = PlayerRouter;
//# sourceMappingURL=player.routing.js.map