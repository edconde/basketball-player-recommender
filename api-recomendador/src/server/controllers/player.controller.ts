import * as express from 'express';
import { AppLogger } from '../logger';
import { IPlayer } from '../models';
import { IPlayerRecomendado } from '../models/player.model';
import { playerService } from '../services';
import { IBaseController } from './base.controller';

export class PlayerController implements IBaseController {
  public constructor() {}

  /**
   * Consultar todos los players
   * @param _req petición
   * @param _res respuesta
   */
  public async get(
    _req: express.Request,
    _res: express.Response
  ): Promise<void> {
    try {
      let players: IPlayer[];
      await playerService
        .findAll()
        .then((data: IPlayer[]) => {
          players = data;
          _res.json(players);
        })
        .catch((error: Error) => {
          AppLogger.error(error);
        });
    } catch (exception) {
      AppLogger.error(exception);
    }
  }
  /**
   * Consultar un player por id
   * @param req petición
   * @param res respuesta
   */
  public async getById(
    _req: express.Request,
    _res: express.Response
  ): Promise<void> {
    try {
      const id = _req.params.id;
      await playerService
        .findById(id)
        .then((data: IPlayer) => {
          _res.json(data);
        })
        .catch((error: Error) => {
          AppLogger.error(error);
        });
    } catch (exception) {
      AppLogger.error(exception);
    }
  }
  // req.body has object of type {firstName:"fnam1",lastName:"lnam1",playerName:"playername1"}
  /**
   * Crear un player
   * @param req petición
   * @param res respuesta
   */
  public async post(_req: express.Request, _res: express.Response) {
    try {
      const player = _req.body;
      await playerService
        .addOne(player)
        .then((data: IPlayer) => {
          _res.json(data);
        })
        .catch((error: Error) => {
          AppLogger.error(error);
        });
    } catch (exception) {
      AppLogger.error(exception);
    }
  }
  /**
   * Modificar un player
   * @param req petición
   * @param res respuesta
   */
  public async put(_req: express.Request, _res: express.Response) {
    try {
      const conditions = {
        _id: _req.params.id,
      };
      const player = _req.body;
      await playerService
        .updateOne(conditions, player)
        .then((data: IPlayer) => {
          _res.json(data);
        })
        .catch((error: Error) => {
          AppLogger.error(error);
        });
    } catch (exception) {
      AppLogger.error(exception);
    }
  }
  /**
   * Eliminar un player por id
   * @param req petición
   * @param res respuesta
   */
  public async delete(_req: express.Request, _res: express.Response) {
    try {
      const id = _req.params.id;
      await playerService
        .deleteById(id)
        .then((data: IPlayer) => {
          _res.json(data);
        })
        .catch((error: Error) => {
          AppLogger.error(error);
        });
    } catch (exception) {
      AppLogger.error(exception);
    }
  }
  /**
   * Consultar players recomendados para un player por id
   * @param req petición
   * @param res respuesta
   */
  public async getPlayersRecomendadosById(
    _req: express.Request,
    _res: express.Response
  ): Promise<void> {
    try {
      const id = _req.params.id;
      const position = _req.query.position as string;
      if (position) {
        await playerService
          .findPlayersRecomendadosById(id, position)
          .then((data: IPlayerRecomendado[]) => {
            _res.json(data);
          })
          .catch((error: Error) => {
            AppLogger.error(error);
          });
      } else {
        _res.status(400);
        _res.json('Es obligatorio indicar una posición.');
      }
    } catch (exception) {
      AppLogger.error(exception);
    }
  }
}
