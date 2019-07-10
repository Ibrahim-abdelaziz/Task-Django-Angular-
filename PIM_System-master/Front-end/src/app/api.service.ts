import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';





@Injectable()
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseurl + "/api" + "/Categories/", {headers: this.httpHeaders});   // /api
  }
}
