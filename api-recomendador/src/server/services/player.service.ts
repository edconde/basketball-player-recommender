import * as mongoose from 'mongoose';
import { Player, IPlayer } from '../models';
import { IPlayerRecomendado } from '../models/player.model';
import CrudService from './crud.service';

/**
 * Clase que realiza las operaciones sobre los documentos de tipo IPlayer
 */
class PlayerService extends CrudService<IPlayer> {
  private static instance: PlayerService;

  private constructor() {
    super(Player);
  }

  /**
   * Devuelve una instancia singleton de la clase
   */
  public static getInstance(): PlayerService {
    if (!PlayerService.instance) {
      PlayerService.instance = new PlayerService();
    }
    return PlayerService.instance;
  }

  /**
   *
   * @param playerName el nombre del player en el documento de tipo <T> a buscar
   */
  public async findByPlayerName(playerName: string): Promise<IPlayer> {
    return Player.findOne({ Name: playerName })
      .then((data: IPlayer) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  
  /**
   *
   * @param playerId el _id del player en el documento de tipo <T> a buscar
   */
  public async findPlayersRecomendadosById(id: string, position: string): Promise<IPlayerRecomendado[]> {
    if (['PG','SG','SF','PF','C'].includes(position.toUpperCase())) {
      return Player.findOne({ _id: new mongoose.Types.ObjectId(id) })
      .then((player: IPlayer) => {
        const compatibilidades = [
          player[`Compatibilidad ${position} Cluster 0`],
          player[`Compatibilidad ${position} Cluster 1`],
          player[`Compatibilidad ${position} Cluster 2`],
          player[`Compatibilidad ${position} Cluster 3`]
        ];

        return Player.find({ Position: position.toUpperCase() }).lean().then((data: any) => {
          const players: IPlayerRecomendado[] = (data as IPlayerRecomendado[]);
          players.forEach(p => p.Score = this.calcularScore(p, compatibilidades));
          const maxScore = Math.max(...players.map(p => p.Score));
          const minScore = Math.min(...players.map(p => p.Score));
          players.forEach(p => p.Score = ((p.Score - minScore)/(maxScore-minScore)));
          return players.sort((a,b) => a.Score < b.Score ? 1 : b.Score < a.Score ? -1: 0);
        })
        .catch((error: Error) => {
          throw error;
        });
      })
      .catch((error: Error) => {
        throw error;
      });
    } else {
      throw new Error('La posición no existe.');
    }
  }

  calcularScore(player: IPlayer, compatibilidades: Array<number>): number {
    let scoreMasAlto = 0;
    // Sólo calculamos score para clusteres con alta compatibilidad (mayor que 0.66 sobre 1)por parte del jugador para el que buscamos compañeros
    compatibilidades.filter(c => c > (2/3)).forEach(c => {
      const score = player[`Pertenencia Cluster ${compatibilidades.indexOf(c)}`] * c;
      if(score > scoreMasAlto) {
        scoreMasAlto = score;
      }
    });
    return scoreMasAlto;
  }
}

export default PlayerService.getInstance();
