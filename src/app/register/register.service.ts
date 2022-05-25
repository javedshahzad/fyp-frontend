import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Major } from '../model/major.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerData: any;
  constructor(private http: HttpClient,) { }

  getMajor(): Observable<Major[]> {
    return this.http.get<Major[]>('https://fypmanagementbackend.in/majorAPI/read.php');
  }

  createUser(form){
    return this.http.post(`https://fypmanagementbackend.in/AccountAPI/create.php`,
     {form
      });
  }
}
