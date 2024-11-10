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
exports.JSONPlayerService = void 0;
const json_player_model_1 = require("../models/json-player.model");
class JSONPlayerService {
    constructor() {
        this.players = (0, json_player_model_1.getPlayers)();
    }
    /**
     * Devuelve una instancia singleton de la clase
     */
    static getInstance() {
        if (!JSONPlayerService.instance) {
            JSONPlayerService.instance = new JSONPlayerService();
        }
        return JSONPlayerService.instance;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.players;
        });
    }
    findOne(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.players.find((player) => player.Name === name);
        });
    }
    create(player) {
        return __awaiter(this, void 0, void 0, function* () {
            this.players.push(player);
            (0, json_player_model_1.savePlayers)(this.players);
            return player;
        });
    }
    update(name, updatedPlayer) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerIndex = this.players.findIndex((player) => player.Name === name);
            if (playerIndex !== -1) {
                this.players[playerIndex] = Object.assign(Object.assign({}, this.players[playerIndex]), updatedPlayer);
                (0, json_player_model_1.savePlayers)(this.players);
                return this.players[playerIndex];
            }
            return undefined;
        });
    }
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialLength = this.players.length;
            this.players = this.players.filter((player) => player.Name !== name);
            if (this.players.length < initialLength) {
                (0, json_player_model_1.savePlayers)(this.players);
                return true;
            }
            return false;
        });
    }
    findByPlayerName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.players.find((player) => player.Name === name);
        });
    }
    findPlayersRecomendadosById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.players.find((player) => player.Name === id);
            if (!player) {
                return [];
            }
            const recommendedPlayers = this.players
                .filter((p) => p.Team === player.Team && p.Name !== player.Name)
                .map((p) => (Object.assign(Object.assign({}, p), { Score: this.calcularScore(player, p) })));
            return recommendedPlayers;
        });
    }
    calcularScore(player1, player2) {
        let score = 0;
        score += Math.abs(player1.Overall - player2.Overall);
        score += Math.abs(player1.Speed - player2.Speed);
        score += Math.abs(player1.Acceleration - player2.Acceleration);
        score += Math.abs(player1.Strength - player2.Strength);
        score += Math.abs(player1.Vertical - player2.Vertical);
        score += Math.abs(player1.Stamina - player2.Stamina);
        score += Math.abs(player1.Hustle - player2.Hustle);
        score += Math.abs(player1['Outside Scoring'] - player2['Outside Scoring']);
        score += Math.abs(player1['Close Shot'] - player2['Close Shot']);
        score += Math.abs(player1['Mid-Range Shot'] - player2['Mid-Range Shot']);
        score += Math.abs(player1['Three-Point Shot'] - player2['Three-Point Shot']);
        score += Math.abs(player1['Free Throw'] - player2['Free Throw']);
        score += Math.abs(player1['Shot IQ'] - player2['Shot IQ']);
        score += Math.abs(player1['Offensive Consistency'] - player2['Offensive Consistency']);
        score += Math.abs(player1['Overall Durability'] - player2['Overall Durability']);
        return score;
    }
}
exports.JSONPlayerService = JSONPlayerService;
exports.default = JSONPlayerService;
//# sourceMappingURL=json-player.service.js.map