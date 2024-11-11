import {
  IJSONPlayer,
  IJSONPlayerRecomendado,
} from '../models/json-player.model';
import players_data from '../models/json-players-data';
import JsonCrudService from './json-crud-service';

export class JSONPlayerService extends JsonCrudService<IJSONPlayer> {
  private static instance: JSONPlayerService;

  constructor() {
    super(players_data);
  }

  /**
   * Devuelve una instancia singleton de la clase
   */
  public static getInstance(): JSONPlayerService {
    if (!JSONPlayerService.instance) {
      JSONPlayerService.instance = new JSONPlayerService();
    }
    return JSONPlayerService.instance;
  }

  /**
   * Devuelve un array de jugadores de la posición indicada
   * @param position la posición de los jugadores a buscar
   */
  public async findByPosition(position: string): Promise<IJSONPlayer[]> {
    return this.findAll().then((players: IJSONPlayer[]) => {
      return players.filter(
        (player) => player.Position === position.toUpperCase()
      );
    });
  }

  /**
   *
   * @param playerId el _id del player en el documento de tipo <T> a buscar
   */
  public async findPlayersRecomendadosById(
    id: string,
    position: string
  ): Promise<IJSONPlayerRecomendado[]> {
    if (['PG', 'SG', 'SF', 'PF', 'C'].includes(position.toUpperCase())) {
      return this.findById(id)
        .then((player: IJSONPlayer) => {
          const compatibilidades = [
            player[`Compatibilidad ${position} Cluster 0`],
            player[`Compatibilidad ${position} Cluster 1`],
            player[`Compatibilidad ${position} Cluster 2`],
            player[`Compatibilidad ${position} Cluster 3`],
          ];

          return this.findByPosition(position)
            .then((data: any) => {
              const players: IJSONPlayerRecomendado[] =
                data as IJSONPlayerRecomendado[];
              players.forEach(
                (p) => (p.Score = this.calcularScore(p, compatibilidades))
              );
              const maxScore = Math.max(...players.map((p) => p.Score));
              const minScore = Math.min(...players.map((p) => p.Score));
              players.forEach(
                (p) => (p.Score = (p.Score - minScore) / (maxScore - minScore))
              );
              return players.sort((a, b) =>
                a.Score < b.Score ? 1 : b.Score < a.Score ? -1 : 0
              );
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

  calcularScore(player: IJSONPlayer, compatibilidades: Array<number>): number {
    let scoreMasAlto = 0;
    // Sólo calculamos score para clusteres con alta compatibilidad (mayor que 0.66 sobre 1)por parte del jugador para el que buscamos compañeros
    compatibilidades
      .filter((c) => c > 2 / 3)
      .forEach((c) => {
        const score =
          player[`Pertenencia Cluster ${compatibilidades.indexOf(c)}`] * c;
        if (score > scoreMasAlto) {
          scoreMasAlto = score;
        }
      });
    return scoreMasAlto;
  }
}

export default JSONPlayerService.getInstance();
