import {Component, OnInit, Type} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoadingController, AlertController} from '@ionic/angular';

import {RegisterService} from './register.service';
import {User} from '../model/user.model';
import {Major} from '../model/major.model';


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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    // this.major = this.registerService.getMajor().subscribe((data:Major)=> this.majors{
    //   majorID: data.majorID,
    //   majorName: data.majorName
    // });
    // console.log('major',this.major);
    this.registerService.getMajor()
      .subscribe(data => {
        this.majors = data;
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

  save(form) {
    console.log(form);
    this.registerService
      .createUser(form)
      .subscribe(data => {
          const res: any = data;
          if (res?.response[0].status=== true) {
            this.showAlert('Your account has been created', 'Success');
            this.user = new User();
          } else {
            this.showAlert(res?.response[0].detail);
          }
        },
        error => {
          this.showAlert('Something went wrong');
        });
  }

  onSubmit(form: NgForm) {
    form.value.userGroupID = 2;
    form.value.studLimit = 0;
    form.value.majorID = this.user.majorID;
    console.log(form.value);
    this.submitted = true;
    this.user.userGroupID = 2;
    this.user.studLimit = 0;
    this.save(form.value);
  }

  private showAlert(message: string, head = 'Registration failed') {
    this.alertCtrl
      .create({
        header: head,
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
