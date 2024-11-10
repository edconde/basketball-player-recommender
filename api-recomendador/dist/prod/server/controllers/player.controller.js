"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const environment_1 = require("../environment");
const logger_1 = require("../logger");
const services_1 = require("../services");
class PlayerController {
    constructor() {
        if (environment_1.ENVIRONMENT['ENVIRONMENT_NAME'] === environment_1.ENVIRONMENT_NAMES.DEVELOPMENT) {
            this.playerService = services_1.JSONPlayerService.getInstance();
        }
        else {
            this.playerService = services_1.DBPlayerService.getInstance();
        }
    }
    /**
     * Consultar todos los players
     * @param _req petición
     * @param _res respuesta
     */
    get(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let players;
                yield this.playerService
                    .findAll()
                    .then((data) => {
                    players = data;
                    _res.json(players);
                })
                    .catch((error) => {
                    logger_1.AppLogger.error(error);
                });
            }
            catch (exception) {
                logger_1.AppLogger.error(exception);
            }
        });
    }
    /**
     * Consultar un player por id
     * @param req petición
     * @param res respuesta
     */
    getById(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = _req.params.id;
                yield this.playerService
                    .findById(id)
                    .then((data) => {
                    _res.json(data);
                })
                    .catch((error) => {
                    logger_1.AppLogger.error(error);
                });
            }
            catch (exception) {
                logger_1.AppLogger.error(exception);
            }
        });
    }
    // req.body has object of type {firstName:"fnam1",lastName:"lnam1",playerName:"playername1"}
    /**
     * Crear un player
     * @param req petición
     * @param res respuesta
     */
    post(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const player = _req.body;
                yield this.playerService
                    .addOne(player)
                    .then((data) => {
                    _res.json(data);
                })
                    .catch((error) => {
                    logger_1.AppLogger.error(error);
                });
            }
            catch (exception) {
                logger_1.AppLogger.error(exception);
            }
        });
    }
    /**
     * Modificar un player
     * @param req petición
     * @param res respuesta
     */
    put(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conditions = {
                    _id: _req.params.id,
                };
                const player = _req.body;
                yield this.playerService
                    .updateOne(conditions, player)
                    .then((data) => {
                    _res.json(data);
                })
                    .catch((error) => {
                    logger_1.AppLogger.error(error);
                });
            }
            catch (exception) {
                logger_1.AppLogger.error(exception);
            }
        });
    }
    /**
     * Eliminar un player por id
     * @param req petición
     * @param res respuesta
     */
    delete(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = _req.params.id;
                yield this.playerService
                    .deleteById(id)
                    .then((data) => {
                    _res.json(data);
                })
                    .catch((error) => {
                    logger_1.AppLogger.error(error);
                });
            }
            catch (exception) {
                logger_1.AppLogger.error(exception);
            }
        });
    }
    /**
     * Consultar players recomendados para un player por id
     * @param req petición
     * @param res respuesta
     */
    getPlayersRecomendadosById(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = _req.params.id;
                const position = _req.query.position;
                if (position) {
                    yield this.playerService
                        .findPlayersRecomendadosById(id, position)
                        .then((data) => {
                        _res.json(data);
                    })
                        .catch((error) => {
                        logger_1.AppLogger.error(error);
                    });
                }
                else {
                    _res.status(400);
                    _res.json('Es obligatorio indicar una posición.');
                }
            }
            catch (exception) {
                logger_1.AppLogger.error(exception);
            }
        });
    }
}
exports.PlayerController = PlayerController;
//# sourceMappingURL=player.controller.js.map