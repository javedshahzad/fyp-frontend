
import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

import { RegisterService } from './register.service';
import { User } from '../model/user.model';
import { Major } from '../model/major.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isLoading = false;
  isLogin = true;
  majors;
  major;
  registerData = [];
  user: User = new User();
  submitted = false;
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    // this.major = this.registerService.getMajor().subscribe((data:Major)=> this.majors{
    //   majorID: data.majorID,
    //   majorName: data.majorName
    // });
    // console.log('major',this.major);
    this.registerService.getMajor()
      .subscribe(data => {
        this.majors=data;
        console.log(this.majors);
      }, error => console.log(error));

  //     this.userForm = formBuilder.group({

  //       email: [''],
  //       password: [''],
  //       confirmPassword: ['', Validators.required],
  //     }, {validator: this.matchingPasswords('passcode', 're_passcode')});


  // matchingPasswords(passcode: string, re_passcode: string) {
  //     // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
  //     return (form: NgForm): {[key: string]: any} => {
  //       let password = form.value.passcode;
  //       let confirmPassword = form.value.re_passcode;

  //       if (password.value !== confirmPassword.value) {
  //         return {
  //           mismatchedPasswords: true
  //         };
  //       }
  //     }
  //   }
  }

  // authenticate(profilename: string, username: string,
  //   email: string, password: string, telnum: string, major: number,
  //   supervisor: number, cosupervisor: number, topicType: number,
  //    title: string, skill: string, problemstmt: string, objective: string, outcome: string, description: string) {
  //   this.isLoading = true;
  //   this.loadingCtrl
  //     .create({ keyboardClose: true, message: 'Logging in...' })
  //     .then(loadingEl => {
  //       loadingEl.present();
  //       this.registerService.signup(profilename, username, email,
  //         password, telnum, major, supervisor, cosupervisor,
  //         topicType, title, skill, problemstmt, objective, outcome, description).subscribe(
  //         resData => {
  //           console.log(resData);
  //           this.isLoading = false;
  //           loadingEl.dismiss();
  //           this.router.navigateByUrl('/places/tabs/discover');
  //         },
  //         errRes => {
  //           loadingEl.dismiss();
  //           const code = errRes.error.error.message;
  //           let message = 'Could not sign you up, please try again.';
  //           if (code === 'EMAIL_EXISTS') {
  //             message = 'This username exists already!';
  //           }
  //           this.showAlert(message);
  //         }
  //       );
  //     });
  // }

  // onSwitchAuthMode() {
  //   this.isLogin = !this.isLogin;
  // }
  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.registerService
    .createUser(this.user).subscribe(data => {
      this.user = new User();
    },
    error => console.log(error));
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.user.userGroupID=2;
    this.user.studLimit=0;
    this.save();
  }

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const profilename = form.value.profilename;
  //   const username = form.value.username;
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   const telnum = form.value.telnum;
  //   const major = form.value.major;
  //   const supervisor = form.value.supervisor;
  //   const cosupervisor = form.value.cosupervisor;
  //   const topicType = form.value.topicType;
  //   const title = form.value.title;
  //   const skill = form.value.skill;
  //   const problemstmt = form.value.problemstmt;
  //   const objective = form.value.objective;
  //   const outcome = form.value.outcome;
  //   const description = form.value.descripton;

  //   this.registerData = [profilename, username, email, password,
  //     telnum, major, supervisor, cosupervisor, topicType, title, skill, problemstmt, objective, outcome, description];
  //     console.log(this.registerData);
  //   this.registerService.signup(this.registerData);
  // }

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
