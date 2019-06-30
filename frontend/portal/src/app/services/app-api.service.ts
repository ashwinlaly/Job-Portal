import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  constructor(private _baseapi$ : BaseApiService) { }

  public isLoggedIn = false;
  
  public Usersigin(data){
    return this._baseapi$.post('signin',data);
  }

  public Usersignup(data){
    return this._baseapi$.post('signup',data);
  }

  public getCompanies(){
    return this._baseapi$.get('companies');
  }

  public getUserDetailsByID(){
    var userId = this.getUserid();
    return this._baseapi$.get(`user/${userId}`);
  }

  public postUserDetailsByID(data){
    var userId = this.getUserid();
    return this._baseapi$.post(`user/${userId}`,data);
  }

  private getUserid() : String{
    return localStorage.getItem('userId');
  }

  public getJobTypesList() {
    return this._baseapi$.get('job_types');
  }

  public createJob(data){
    return this._baseapi$.post('company/addjob',data);
  }

  public getAllJobs(){
    return this._baseapi$.get('jobs');
  }

  public applyForJob(data){
    return this._baseapi$.post('apply',data);
  }

  public getJobsByCompany(company_id){
    return this._baseapi$.get(`company/jobs/${company_id}`);
  }

}
