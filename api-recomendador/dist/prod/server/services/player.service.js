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
const mongoose = require("mongoose");
const models_1 = require("../models");
const crud_service_1 = require("./crud.service");
/**
 * Clase que realiza las operaciones sobre los documentos de tipo IPlayer
 */
class PlayerService extends crud_service_1.default {
    constructor() {
        super(models_1.Player);
    }
    /**
     * Devuelve una instancia singleton de la clase
     */
    static getInstance() {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }
    /**
     *
     * @param playerName el nombre del player en el documento de tipo <T> a buscar
     */
    findByPlayerName(playerName) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.Player.findOne({ Name: playerName })
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    /**
     *
     * @param playerId el _id del player en el documento de tipo <T> a buscar
     */
    findPlayersRecomendadosById(id, position) {
        return __awaiter(this, void 0, void 0, function* () {
            if (['PG', 'SG', 'SF', 'PF', 'C'].includes(position.toUpperCase())) {
                return models_1.Player.findOne({ _id: new mongoose.Types.ObjectId(id) })
                    .then((player) => {
                    const compatibilidades = [
                        player[`Compatibilidad ${position} Cluster 0`],
                        player[`Compatibilidad ${position} Cluster 1`],
                        player[`Compatibilidad ${position} Cluster 2`],
                        player[`Compatibilidad ${position} Cluster 3`],
                    ];
                    return models_1.Player.find({ Position: position.toUpperCase() })
                        .lean()
                        .then((data) => {
                        const players = data;
                        players.forEach((p) => (p.Score = this.calcularScore(p, compatibilidades)));
                        const maxScore = Math.max(...players.map((p) => p.Score));
                        const minScore = Math.min(...players.map((p) => p.Score));
                        players.forEach((p) => (p.Score = (p.Score - minScore) / (maxScore - minScore)));
                        return players.sort((a, b) => a.Score < b.Score ? 1 : b.Score < a.Score ? -1 : 0);
                    })
                        .catch((error) => {
                        throw error;
                    });
                })
                    .catch((error) => {
                    throw error;
                });
            }
            else {
                throw new Error('La posición no existe.');
            }
        });
    }
    calcularScore(player, compatibilidades) {
        let scoreMasAlto = 0;
        // Sólo calculamos score para clusteres con alta compatibilidad (mayor que 0.66 sobre 1)por parte del jugador para el que buscamos compañeros
        compatibilidades
            .filter((c) => c > 2 / 3)
            .forEach((c) => {
            const score = player[`Pertenencia Cluster ${compatibilidades.indexOf(c)}`] * c;
            if (score > scoreMasAlto) {
                scoreMasAlto = score;
            }
        });
        return scoreMasAlto;
    }
}
exports.default = PlayerService;
//# sourceMappingURL=player.service.js.map