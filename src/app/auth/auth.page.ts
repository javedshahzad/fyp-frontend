import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoadingController, AlertController, NavController, MenuController} from '@ionic/angular';

import {AuthService} from './auth.service';
import {AuthProvider} from 'src/providers/auth/auth';
import {ApiService} from '../services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  user = {
    userName: '',
    passcode: '',
  };
  userData: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private httpClient: HttpClient,
    private authProvider: AuthProvider,
    private api: ApiService,
    public menuCtrl: MenuController
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave(): void {
    this.menuCtrl.enable(true);
  }


  validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async onSubmit(form: NgForm) {
    const fD = new FormData();
    fD.append('userName', this.user.userName);
    fD.append('passcode', this.user.passcode);
    if (this.validateEmail(this.user.userName)) {
      fD.append('isEmail', JSON.stringify(true));
    }
    /* this.httpClient.post(`https://fypmanagementbackend.in/AccountAPI/login.php`, fD).subscribe(res => {
       const response = res['response'][0];
       if (response.status) {
         console.log(res);
       } else {
         this.showAlert(response.desc);
         console.log(res);
       }
     }, err => {
       this.showAlert('We did not find any user');
     });*/
    console.log(this.user);
    this.authProvider.loginData('https://fypmanagementbackend.in/AccountAPI/login.php', fD).subscribe((resp: any) => {
        const response = resp.response[0];
        if (response.status) {
        this.userData = response.detail;
        console.log(this.userData);
        console.log(this.userData?.userName);
        console.log(this.userData?.email);
        console.log(this.userData?.profileName);
        console.log(this.userData?.accountID);
        const res = this.userData;
        localStorage.setItem('accountID', res.accountID);
        localStorage.setItem('profileName', res.profileName);
        localStorage.setItem('email', res.email);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('userGroupID', res.userGroupID);
        console.log( res.userGroupID);
        // console.log(localStorage);
        this.api.isupdateLogin.next(true);
        // if (response.status) {
          const data = this.userData;
          this.authProvider.login(data.userGroupID, data.userName, data.profileName, data.accountID, data.majorID,
            data.majorName, data.phoneNUm, data.email).then(success => {
            if (success) {

            }
          });

        } else {

          this.showAlert(response.desc);
        }
      },
      err => {
        this.showAlert('We did not find any user');
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
