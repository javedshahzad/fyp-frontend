import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  userName: string;
  userGroupID: number;
}

@Injectable()
export
 class AuthProvider{
  currentUser: User;

  constructor(public http: HttpClient){

  }

  login(userName: string, passcode: string): Promise<boolean>{
  return new Promise((resolve, reject)=>{
    if(userName === 'admin' && passcode ==='admin'){
      this.currentUser={
        userName,
        userGroupID: 0
      };
      resolve(true);
    } else if(userName === 'student' && passcode === 'student'){
      this.currentUser={
        userName,
        userGroupID: 1
      };
      resolve(true);
    } else if(userName === 'student' && passcode === 'student'){
      this.currentUser={
        userName,
        userGroupID: 1
      };
      resolve(true);
    } else {
      resolve(false);
    }
  });
  }

  isLoggedIn(){
    return this.currentUser !=null;
  }

  logout(){
    this.currentUser = null;
  }

  isAdmin(){
    return this.currentUser.userGroupID ===0;
  }

  isLecturer(){
    return this.currentUser.userGroupID ===1;
  }

  isStudent(){
    return this.currentUser.userGroupID ===2;
  }
 }
