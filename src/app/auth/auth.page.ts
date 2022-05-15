import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { AuthProvider } from 'src/providers/auth/auth';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  user = {
    userName:'',
    passcode: '',
  };
  userData: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private authProvider: AuthProvider,
    private api: ApiService
  ) {}

  ngOnInit() {}

  // authenticate(username: string, password: string) {
  //   this.isLoading = true;
  //   this.authService.login();
  //   this.loadingCtrl
  //     .create({ keyboardClose: true, message: 'Logging in...' })
  //     .then(loadingEl => {
  //       loadingEl.present();

  //           // this.showAlert(message);
  //         }
  //       );
  // }



  onSubmit(form: NgForm) {
 console.log(this.user);

 const formData =new FormData();
 formData.append('userName', this.user.userName);
 formData.append('passcode', this.user.passcode);
 this.authProvider.loginData('https://fypmanagementbackend.in/AccountAPI/login.php', formData).subscribe((res: any) => {
   this.userData=res;
     console.log(res);
     console.log(this.userData);
     console.log(this.userData.userName);
     console.log(this.userData.email);
     console.log(this.userData.profileName);
     console.log(this.userData.accountID);
     if (res.err === false) {
      this.authProvider.login(res.userGroupID,res.userName,res.profileName,res.accountID,res.majorID,
        res.majorName,res.phoneNUm,res.email).then(success => {
        if (success){
          localStorage.setItem('accountID',res.accountID);
          localStorage.setItem('profileName',res.profileName);
          localStorage.setItem('email',res.email);
          localStorage.setItem('userName',res.userName);
          localStorage.setItem('userGroupID',res.userGroupID);
          // console.log(localStorage);
          this.api.isupdateLogin.next(true);
          // this.router.navigateByUrl('/menu');
        }
      });
      //  localStorage.setItem('accountID',res.accountID);
      //  localStorage.setItem('userName',res.userName);
      //  this.router.navigateByUrl('/menu');

     } else{

       this.showAlert(res.message);
     }
 },
 err => {
   console.log('err: ', err);
});



  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
