import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from  '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RestService{
  API_URL  =  environment.apiUrl;
  constructor(private  httpClient:  HttpClient) { }

  getHttpOptions() {
    const httpoptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-control': 'no-cache'
      })
    };
    return httpoptions;
  }

  getAll(endPiont){
    return  this.httpClient.get(`${this.API_URL}/${endPiont}`);
  }
  get(endPiont, id){
    return  this.httpClient.get(`${this.API_URL}/${endPiont}/${id}`, this.getHttpOptions());
  }
}
