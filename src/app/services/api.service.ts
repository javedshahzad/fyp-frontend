import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isupdateLogin = new BehaviorSubject(true);
  constructor(
    public http: HttpClient,
  ) { }

  postData(url,data){
    return this.http.post(url, data);
  }
}
