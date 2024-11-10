"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const https = require("https");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../server/config/documentation/swagger.json");
const environment_1 = require("./environment");
const logger_1 = require("./logger");
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRouting();
    }
    // Configure Express middleware.
    initializeMiddlewares() {
        // Parses the body of the incoming request and makes it available under the request.body property
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Enable cors
        this.app.use(cors());
        this.app.options('*', cors());
        // error handler
        this.app.use(middleware_1.errorMiddleware);
    }
    initializeRouting() {
        // test api
        this.app.get('/', (req, res, next) => {
            res.send('Typescript App works!!');
        });
        // api routing
        this.app.use('/api', routes_1.Routes.getRoutes());
        // swagger endpoint
        if (environment_1.ENVIRONMENT['ENVIRONMENT_NAME'] === environment_1.ENVIRONMENT_NAMES.DEVELOPMENT) {
            this.initializeSwagger();
        }
        // handle undefined routes
        this.app.use('*', (req, res, next) => {
            res.send('Make sure url is correct!!!');
        });
    }
    initializeSwagger() {
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
    // start listening
    listen() {
        if (environment_1.ENVIRONMENT['ENVIRONMENT_NAME'] === environment_1.ENVIRONMENT_NAMES.DEVELOPMENT) {
            this.app.listen(this.port, () => {
                logger_1.AppLogger.log(`Express running on port ${this.port}`);
            });
        }
        else {
            https
                .createServer({
                cert: fs.readFileSync(process.env['SSL-CERT-PATH']),
                ca: fs.readFileSync(process.env['SSL-CERT-CHAIN-PATH']),
                key: fs.readFileSync(process.env['SSL-CERT-PRIVATE-KEY-PATH']),
            }, this.app)
                .listen(this.port, function () {
                logger_1.AppLogger.log(`Express running on port ${this.port}`);
            });
        }
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map