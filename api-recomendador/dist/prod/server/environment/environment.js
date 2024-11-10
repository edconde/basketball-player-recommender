"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEV_ENV = require("../config/environments/development.environment.json");
const PROD_ENV = require("../config/environments/production.environment.json");
const environment_names_1 = require("./environment-names");
let environment;
const environment_name = process.env.NODE_ENV;
if (environment_name &&
    environment_name.trim() === environment_names_1.ENVIRONMENT_NAMES.PRODUCTION) {
    environment = PROD_ENV;
}
else {
    environment = DEV_ENV;
}
exports.default = environment;
//# sourceMappingURL=environment.js.map