import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AlertController} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.page.html',
  styleUrls: ['./update-account.page.scss'],
})
export class UpdateAccountPage implements OnInit {
  majors;
  majorID;
  userGroupID;
  profileName;
  userName;
  email;
  phoneNum;
  passcode;
  userData;
  accountID;
  studLimit;
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private alertCtrl: AlertController,
  ) {
    this.activeRoute.queryParams.subscribe((res: any)=>{
      this.userData = res.userData;
      this.accountID = this.userData.accountID;
      this.majorID= this.userData.majorID;
      this.profileName= this.userData.profileName;
      this.phoneNum= this.userData.phoneNum;
      this.passcode= this.userData.passcode;
      this.email = this.userData.email;
      this.studLimit = this.userData.studLimit;

      console.log(this.userData);
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

  onSubmit() {
    const formData =new FormData();
    formData.append('accountID', this.accountID);
    formData.append('profileName', this.profileName);
    formData.append('email', this.email);
    formData.append('passcode', this.passcode);
    formData.append('phoneNum', this.phoneNum);
    formData.append('studLimit', this.studLimit);
    formData.append('majorID', this.majorID);

    this.apiService.postData('https://fypmanagementbackend.in/AccountAPI/update.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.showAlert(res.message);
      }else{
        this.showAlert(res.message);
      }
    });
  }

  showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Created success',
        message,
        backdropDismiss:false,
        buttons: [
          {
           text: 'Okay',
           id: 'confirm-button',
           handler: () => {
           //  console.log('Confirm Okay');
            //  this.nav.navigateBack('login');
            //  localStorage.setItem('userGroupID','');
           }
         }
       ]
      })
      .then(alertEl => alertEl.present());
  }
}
