import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.page.html',
  styleUrls: ['./uploadfile.page.scss'],
})
export class UploadfilePage implements OnInit {
  assessmentID: any;
  file: any;
  assessmentData: any;
  userEmai: string;
  userProfileName: any;
  userAccountId: string;
  userEmail;

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertController: AlertController,
    private nav: NavController
  ) {
    this.activatedRoute.queryParams.subscribe((res: any)=>{
      this.assessmentID=res.assessmentID;
      console.log(this.assessmentID);
      console.log(res.data,'Assessment');
      this.assessmentData=res.data;
    });
  }

  ngOnInit() {
  }
  upload(event){
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);

  }
  uploaded(){
    const formData =new FormData();

    formData.append('assessmentID', this.assessmentID);
    formData.append('files', this.file);
    this.apiService.postData('https://fypmanagementbackend.in/UploadApi/uploads.php',formData).subscribe((res: any)=>{
    console.log(res);
    if(res.err === false){
      this.sendMail();
    }else{
      //this.presentAlertConfirm(res.message);
    }
    });

  }
  async presentAlertConfirm(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Message',
      message: msg,
      mode:'ios',
      backdropDismiss:false,
      buttons: [
         {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.nav.back();
          }
        }
      ]
    });

    await alert.present();
  }

  sendMail(){
    this.userEmail=localStorage.getItem('email');
    this.userProfileName=localStorage.getItem('profileName');
    this.userAccountId=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('assessmentID', this.assessmentID);
    formData.append('assessmentName', this.assessmentData.assessmentName);
    formData.append('lectID', this.assessmentData.lectID);
    formData.append('title', this.assessmentData.title);
    formData.append('accountID', this.userAccountId);
    formData.append('profileName', this.userProfileName);
    formData.append('email', this.userEmail);
    formData.append('projectID', this.assessmentData.projectID);
    this.apiService.postData('https://fypmanagementbackend.in/SendMailNotification/mail.php',formData).subscribe((res: any)=>{
    console.log(res);
    if(res.err === false){
      this.presentAlertConfirm('Email is sent and file is uploaded');
    }else{
      this.presentAlertConfirm(res.message);
    }
    });

  }
}
