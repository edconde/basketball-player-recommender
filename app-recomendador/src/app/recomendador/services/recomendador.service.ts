import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IPlayer, IPlayerRecomendado } from 'src/app/models/player.model';

@Injectable({
  providedIn: 'root'
})
export class RecomendadorService {

  readonly serviceUrl = environment.apiRootUrl + '/players';

  private getEndpoint(resource?: string) {
    if (resource) {
      return this.serviceUrl + resource;
    } else {
      return this.serviceUrl;
    }
  }

  constructor(private http: HttpClient) { }

  public findAllPlayers(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.getEndpoint());
  }

  public getById(id: string): Observable<IPlayer> {
    return this.http.get<IPlayer>(this.getEndpoint() + '/' + id);
  }

  public findCompatibles(id: string, position: string): Observable<Array<IPlayerRecomendado>> {
    return this.http
      .get<Array<IPlayerRecomendado>>(this.getEndpoint() + '/' + id + '/recomendaciones', {
        params: new HttpParams().set('position', position),
      });
  }
}