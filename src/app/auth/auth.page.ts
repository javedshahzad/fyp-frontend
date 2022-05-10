import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  user = {
    userName:'admin',
    passcode: 'admin',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private authProvider: AuthProvider,
  ) {}

  ngOnInit() {}

  authenticate(username: string, password: string) {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();

            // this.showAlert(message);
          }
        );
  }



  onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const username = form.value.username;
  //   const password = form.value.password;

  //   this.authenticate(username, password);
  // }

  // private showAlert(message: string) {
  //   this.alertCtrl
  //     .create({
  //       header: 'Authentication failed',
  //       message,
  //       buttons: ['Okay']
  //     })
  //     .then(alertEl => alertEl.present());
  this.authProvider.login(this.user.userName, this.user.passcode).then(success => {
    if (success){
      this.router.navigateByUrl('/menu');
    }
  }).catch(async err => {
    const code = err.error.error.message;
    const message = 'Please check your credentials';

    this.showAlert(message);
  }
  );
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
