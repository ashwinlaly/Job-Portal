import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  loggedIn  = new BehaviorSubject('0');
  loggedType = new BehaviorSubject('0');
  UserLoggedIn:string;
  CompanyLoggedIn:string;

  constructor() { }

  public setUserLoggedIn(state : string){
    this.loggedIn.next(state);
  }

  public setUserLoggedInType(state : string){
    this.loggedType.next(state);
  }

  public setUserLoggedInId(state : string){
    localStorage.setItem('userId',state);
  }

  public getUserLoggedInId(): string{
    return localStorage.getItem('userId');
  }

}
