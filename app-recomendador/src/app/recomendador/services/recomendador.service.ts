import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { IPlayer, IPlayerRecomendado } from 'src/app/models/player.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecomendadorService {

  private serviceUrl: any;
  private usesMock = false;

  private getEndpoint(resource?: string) {
    if (resource) {
      return this.serviceUrl + resource;
    } else {
      return this.serviceUrl;
    }
  }

  constructor(private http: HttpClient) {
    if(environment.apiRootUrl) {
      this.serviceUrl = environment.apiRootUrl + '/players';
    } else {
      this.usesMock = true;
    }
     
  }

  public findAllPlayers(): Observable<Array<any>> {
    if(this.usesMock) {
      return this.http.get<Array<IPlayer>>('assets/data/players.json');
    } else {
      return this.http.get<Array<any>>(this.getEndpoint());
    }
  }

  public getById(id: any): Observable<IPlayer> {
    if(this.usesMock) {
      return this.findAllPlayers().pipe(
        map(players => {
          console.log(id);
          const player = players.find(player => (player._id as {$oid: string}).$oid === (id as {$oid: string}).$oid);
          if (!player) {
            throw new Error('Player not found');
          }
          return player;
        })
      );
    } else {
      return this.http.get<IPlayer>(this.getEndpoint() + '/' + id);
    }
  }

    /**
   * Devuelve un array de jugadores de la posición indicada
   * @param position la posición de los jugadores a buscar
   */
  public findByPosition(position: string): Observable<IPlayer[]> {
    return this.findAllPlayers().pipe(map((players: IPlayer[]) => { return players.filter(player => player.Position === position.toUpperCase()) }));
  }

  public findCompatibles(id: string, position: string): Observable<Array<IPlayerRecomendado>> {
    if(this.usesMock) {
      if (['PG', 'SG', 'SF', 'PF', 'C'].includes(position.toUpperCase())) {
        return this.getById(id).pipe(
          switchMap((player: IPlayer) => {
            const compatibilidades = [
              player[`Compatibilidad ${position} Cluster 0`],
              player[`Compatibilidad ${position} Cluster 1`],
              player[`Compatibilidad ${position} Cluster 2`],
              player[`Compatibilidad ${position} Cluster 3`],
            ];
            return this.findByPosition(position).pipe(
              map((data: any) => {
                const players: IPlayerRecomendado[] = data as IPlayerRecomendado[];
                players.forEach((p) => (p.Score = this.calcularScore(p, compatibilidades)));
                const maxScore = Math.max(...players.map((p) => p.Score));
                const minScore = Math.min(...players.map((p) => p.Score));
                players.forEach((p) => (p.Score = (p.Score - minScore) / (maxScore - minScore)));
                return players.sort((a, b) => a.Score < b.Score ? 1 : b.Score < a.Score ? -1 : 0);
              })
            );
          })
        );
      } else {
        throw new Error('La posición no existe.');
      }
    } else {
    return this.http
      .get<Array<IPlayerRecomendado>>(this.getEndpoint() + '/' + id + '/recomendaciones', {
        params: new HttpParams().set('position', position),
      });
    }
  }

  private calcularScore(player: IPlayer, compatibilidades: Array<number>): number {
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