import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/api-urls';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
private readonly apiUrl=API_URLS.getJobs
  constructor(private httpClient:HttpClient) { }


  getJobs(search?:string,sort?:string,page?:number,limit?:number):Observable<any>{
    let params=new HttpParams();

    if(search){
      params=params.set('search',search);
    }
    if(sort){
      params=params.set('sort',sort)
    }
    if(page){
      params=params.set('page',page.toString())
    }
    if(limit){
      params=params.set('limit',limit.toString())
    }
    return this.httpClient.get(this.apiUrl,{params,withCredentials:true})
  }
}
