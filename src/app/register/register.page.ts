import {Component, OnInit, Type} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoadingController, AlertController, MenuController} from '@ionic/angular';

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
  majors;
  major;
  registerData = [];
  user: User = new User();
  submitted = false;

  constructor(
    private registerService: RegisterService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.registerService.getMajor()
      .subscribe(data => {
        this.majors = data;
        console.log(this.majors);
      }, error => console.log(error));
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
    if(form.value.passcode === form.value.re_passcode){
      form.value.userGroupID = 2;
    form.value.studLimit = 0;
    form.value.majorID = this.user.majorID;
    console.log(form.value);
    this.submitted = true;
    this.user.userGroupID = 2;
    this.user.studLimit = 0;
    this.save(form.value);
    }else{
      this.showAlert('Password must match with re-enter password');
    }
    
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
