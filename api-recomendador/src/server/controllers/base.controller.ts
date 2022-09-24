import * as express from 'express';

/**
 * Define métodos comunes para los controladores que implementan esta interfaz
 */
export interface IBaseController {
  getById(_req: express.Request, _res: express.Response): Promise<any>;
  get(_req: express.Request, _res: express.Response): Promise<any>;
  post(_req: express.Request, _res: express.Response): Promise<any>;
  put(_req: express.Request, _res: express.Response): Promise<any>;
  delete(_req: express.Request, _res: express.Response): Promise<any>;
}
