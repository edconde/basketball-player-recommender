"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const logger_1 = require("../logger");
class NbaDB {
    constructor() { }
    static getInstance() {
        if (!NbaDB.instance) {
            NbaDB.instance = new NbaDB();
        }
        return NbaDB.instance;
    }
    connect() {
        logger_1.AppLogger.info(NbaDB.DATABASE_URI);
        mongoose.connect(NbaDB.DATABASE_URI, {});
        mongoose.connection.once('open', () => {
            logger_1.AppLogger.info('Connected to Mongo via Mongoose');
        });
        mongoose.connection.on('error', (err) => {
            logger_1.AppLogger.error('Unable to connect to Mongo via Mongoose', err);
        });
    }
}
NbaDB.DATABASE_URI = process.env.MONGODB_CONNECTION_STRING;
exports.default = NbaDB.getInstance();
//# sourceMappingURL=nba.database.js.map