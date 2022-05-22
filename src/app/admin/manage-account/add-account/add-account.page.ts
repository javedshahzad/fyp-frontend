import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AlertController} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import {RegisterService} from '../../../register/register.service';
import {User} from '../../../model/user.model';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {
  // majors;
  // majorID;
  // roleID;
  // profileName;
  // userName;
  // email;
  // phoneNum;
  // passcode;
  isLoading = false;
  isLogin = true;
  majors;
  major;
  userGroupID;
  registerData = [];
  user: User = new User();
  submitted = false;



  constructor(
    private registerService: RegisterService,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private alertCtrl: AlertController,
  ) {
    this.activeRoute.queryParams.subscribe((res: any)=>{
      this.userGroupID = res.userGroupID;
    });
  }

  ngOnInit() {
    this.getallMajor();

  }

  getallMajor(){
    this.apiService.getData('https://fypmanagementbackend.in/majorAPI/read.php').subscribe((res: any)=>{
      console.log(res);
      if(res){
        this.majors=res;
      }
    });
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
    form.value.userGroupID = this.userGroupID;
    form.value.majorID = this.user.majorID;
    console.log(form.value);
    this.submitted = true;
    this.user.userGroupID = this.userGroupID;
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
