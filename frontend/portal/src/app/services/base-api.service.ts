import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map , catchError } from 'rxjs/operators';
import { config } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  private APP = config.APP_URL;
  private header: Headers;

  constructor(private http: Http) { 
    this.header = new Headers({
      "Content-Type" : "application/json; charset=UTF-8",
      Accept : "application/json"
    });
  }

  get(path : String) : Observable<any>{
    return this.http.get(`${this.APP}${path}`,{ headers : this.header}).pipe(
      map(this.catchForError),
      catchError(err => throwError (err)),
      map(this.getJSON)
    ); 
  }

  post(path: String, body : any) : Observable<any> {
    return this.http.post(`${this.APP}${path}`, JSON.stringify(body), {headers : this.header}).pipe(
      map(this.catchForError),
      catchError((err) => throwError (err)),
      map(this.getJSON)
    );
  }

  private getJSON(responce : Response) {
    return responce.json();
  }

  private catchForError(responce : Response) : Response {
    if(responce.status < 200 || responce.status <= 300){
      return responce
    } else {
      const error = new Error(responce.statusText);
      error['responce'] = responce;
      throw error;
    }
  }

}
