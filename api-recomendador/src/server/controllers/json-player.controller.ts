import * as express from 'express';
import { AppLogger } from '../logger';
import { IJSONPlayer } from '../models';
import { IJSONPlayerRecomendado } from '../models/json-player.model';
import { jsonPlayerService as playerService } from '../services';

export class JSONPlayerController {
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
      let players: IJSONPlayer[];
      await playerService
        .findAll()
        .then((data: IJSONPlayer[]) => {
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
        .then((data: IJSONPlayer) => {
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
          .then((data: IJSONPlayerRecomendado[]) => {
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
