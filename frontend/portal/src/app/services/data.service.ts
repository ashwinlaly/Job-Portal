import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() { }

  public getUserLoggedIn():string{
    var ul = localStorage.getItem('userLoggedIn');
    if((ul == "0") || (ul == "null") || (ul == null) ){
      return "0";
    } else {
      return "1";
    }
  }

  public getUserLoggedInType(): string{
    var ul = localStorage.getItem('userType');
    if((ul == "2")){
      return "2";
    } else {
      return "1";
    } 
  }

  public getUserLoggedInId(): string{
    return localStorage.getItem('userId');
  }

  public setUserLoggedIn(state : string){
    localStorage.setItem('userLoggedIn',state);
  }

  public setUserLoggedInType(state : string){
    localStorage.setItem('userType',state);
  }

  public setUserLoggedInId(state : string){
    localStorage.setItem('userId',state);
  }

}
