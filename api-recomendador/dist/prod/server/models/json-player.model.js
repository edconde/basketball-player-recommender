"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePlayers = exports.getPlayers = void 0;
const fs = require("fs");
const path = require("path");
const playersFilePath = path.join(__dirname, '..', 'data', 'players.json');
const getPlayers = () => {
    const data = fs.readFileSync(playersFilePath, 'utf8');
    return JSON.parse(data);
};
exports.getPlayers = getPlayers;
const savePlayers = (players) => {
    const data = JSON.stringify(players, null, 2);
    fs.writeFileSync(playersFilePath, data, 'utf8');
};
exports.savePlayers = savePlayers;
//# sourceMappingURL=json-player.model.js.map