import * as DEV_ENV from '../config/environments/development.environment.json';
import * as PROD_ENV from '../config/environments/production.environment.json';
import { ENVIRONMENT_NAMES } from './environment-names';

let environment: any;
const environment_name = process.env.NODE_ENV;
if (
  environment_name &&
  environment_name.trim() === ENVIRONMENT_NAMES.PRODUCTION
) {
  environment = PROD_ENV;
} else {
  environment = DEV_ENV;
}

export default environment;
