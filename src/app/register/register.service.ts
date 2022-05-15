import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Major } from '../model/major.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface AccountData {
  profilename: string;
  matrics: string;
  email: string;
  password: string;
  telnum: string;
  major: number;
}
interface ProjectData{
  topicType: number;
  title: string;
  skill: string;
  problemstmt: string;
  objective: string;
  outcome: string;
  description: string;
}

interface MajorData {
  majorID: number;
  majorName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerData: any;
  constructor(private http: HttpClient) { }

  // getMajor() {
  //   return this.http
  //     .get<MajorData>(
  //       `https://fypmanagementsystemfcsitunimas.000webhostapp.com/majorAPI/read.php`
  //     )
  //     .pipe(
  //       map(majorData => new Major(
  //           majorData.majorID,
  //           majorData.majorName
  //         ))
  //     );
  // }

  getMajor(): Observable<Major[]> {
    return this.http.get<Major[]>('https://fypmanagementbackend.in/majorAPI/read.php');
  }

  // signup(registerData) {
  //   console.log(registerData);
  //   return this.http.post<AccountData>(
  //     `https://fypmanagementsystemfcsitunimas.000webhostapp.com/AccountAPI/create.php`,
  //     registerData
  //   ).subscribe((res)=>{
  //       console.log(res);
  //   });
  // }
  createUser(form){
    return this.http.post(`https://fypmanagementbackend.in/AccountAPI/create.php`,
     {form
      });
  }
}
