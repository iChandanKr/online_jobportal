import { Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { type Education } from '../model/jobseeker.model';
import { type JobSeekerDetails } from '../model/jobseeker.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateJobseekerService {

  private readonly getEducationDetailsUrl=API_URLS.getEducationDetails;
  private readonly getJobseekerUrl=API_URLS.getJobseeker;

  constructor(private httpClient:HttpClient) { }

  getEducationDetails(): Observable<any> {
    return this.httpClient.get<{status:string;message:string;data:Education}>(this.getEducationDetailsUrl,{withCredentials:true});
  }

  getJobseeker():Observable<any>{
    return this.httpClient.get<{status:string;message:string;data:JobSeekerDetails}>(this.getJobseekerUrl,{withCredentials:true})
  }
}
