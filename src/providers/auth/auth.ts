import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

export interface User {
  userName: string;
  userGroupID: number;
  profileName: string;
  accountID: string;
  majorID: string;
  majorName: string;
  phoneNum: string;
  email: string;
}

@Injectable()
export
 class AuthProvider{
  currentUser: User;

  constructor(public http: HttpClient,
    private nav: NavController
    ){

  }


  login(id,userName,profileName,accountID,majorID,majorName,phoneNum,email): Promise<boolean>{
  return new Promise((resolve, reject)=>{
    if(id ==='0'){
      this.currentUser={
        userName,
        userGroupID: 0,
        profileName,
        accountID,
        majorID,
        majorName,
        phoneNum,
        email,
      };
      resolve(true);
      this.nav.navigateForward('admin');
    } else if(id === '1'){
      this.currentUser={
        userName,
        userGroupID: 1,
        profileName,
        accountID,
        majorID,
        majorName,
        phoneNum,
        email,
      };
      resolve(true);
      this.nav.navigateForward('lecturer');
    } else if(id === '2'){
      this.currentUser={
        userName,
        userGroupID: 2,
        profileName,
        accountID,
        majorID,
        majorName,
        phoneNum,
        email,
      };
      resolve(true);
      this.nav.navigateForward('student');
    } else {
      resolve(false);
    }
    console.log(this.currentUser);
  });
  }
  loginData(url, data) {
    return this.http.post(url, data);
  }


  isLoggedIn(){
    return localStorage.getItem('userGroupID') !=null;
  }

  logout(){
    this.currentUser = null;
    localStorage.clear();
    this.nav.navigateRoot('login');
  }

  isAdmin(){
    return localStorage.getItem('userGroupID') === '0';
  }

  isLecturer(){
    return localStorage.getItem('userGroupID') ==='1';
  }

  isStudent(){
    return localStorage.getItem('userGroupID') ==='2';
  }
 }
