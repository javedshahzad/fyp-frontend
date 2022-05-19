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

  constructor(
    private router:Router,
    public activatedRoute: ActivatedRoute,
    private api :ApiService,
    private alertController:AlertController,
    private nav:NavController
  ) { 
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.assessmentID=res.assessmentID;
      console.log(this.assessmentID);
    })
  }

  ngOnInit() {
  }
  upload(event){
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);
  
  }
  Uploaded(){
    const formData =new FormData();
 
    formData.append('assessmentID', this.assessmentID);
    formData.append('files', this.file);
    this.api.postData('https://fypmanagementbackend.in/UploadApi/uploads.php',formData).subscribe((res:any)=>{
    console.log(res);
    if(res.err === false){
      this.presentAlertConfirm(res.message);
    }else{
      this.presentAlertConfirm(res.message);
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
}
