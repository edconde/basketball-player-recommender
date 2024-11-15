import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../server/config/documentation/swagger.json';
import { ENVIRONMENT, ENVIRONMENT_NAMES } from './environment';
import { AppLogger } from './logger';
import { errorMiddleware } from './middleware';
import { Routes } from './routes';

class App {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRouting();
  }

  // Configure Express middleware.
  private initializeMiddlewares(): void {
    // Parses the body of the incoming request and makes it available under the request.body property
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // Enable cors
    this.app.use(cors());
    this.app.options('*', cors());

    // error handler
    this.app.use(errorMiddleware);
  }

  private initializeRouting(): void {
    // test api
    this.app.get('/', (req, res, next) => {
      res.send('Typescript App works!!');
    });

    // api routing
    this.app.use('/api', Routes.getRoutes());

    // swagger endpoint
    if (ENVIRONMENT['ENVIRONMENT_NAME'] === ENVIRONMENT_NAMES.DEVELOPMENT) {
      this.initializeSwagger();
    }

    // handle undefined routes
    this.app.use('*', (req, res, next) => {
      res.send('Make sure url is correct!!!');
    });
  }

  private initializeSwagger() {
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  // start listening
  public listen() {
    if (ENVIRONMENT['ENVIRONMENT_NAME'] === ENVIRONMENT_NAMES.DEVELOPMENT) {
      this.app.listen(this.port, () => {
        AppLogger.log(`Express running on port ${this.port}`);
      });
    } else {
      https
        .createServer(
          {
            cert: fs.readFileSync(process.env['SSL-CERT-PATH']),
            ca: fs.readFileSync(process.env['SSL-CERT-CHAIN-PATH']),
            key: fs.readFileSync(process.env['SSL-CERT-PRIVATE-KEY-PATH']),
          },
          this.app
        )
        .listen(this.port, function () {
          AppLogger.log(`Express running on port ${this.port}`);
        });
    }
  }
}

export { App };
