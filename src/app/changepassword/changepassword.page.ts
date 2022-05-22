import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  passcode:any='';
  userName:any='';
  accountID: string;
  constructor(
    private apiService:ApiService,
    private alertController:AlertController
  ) { }

  ngOnInit() {
  }
  changepassword(){
  if(this.passcode && this.userName){
    this.accountID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('userName', this.userName);
    formData.append('passcode', this.passcode);
    formData.append('accountID',this.accountID);
    this.apiService.postData('https://fypmanagementbackend.in/ChangePasswordApi/changepassword.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        // this.lecturerType=res.data;
        this.showAlert(res.message);

      }else{
        this.showAlert(res.message);
      }
    });
  }else{
    this.showAlert('Please enter username and new password to change');
  }
  }
  showAlert(message) {
    this.alertController
      .create({
        header: 'Message',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

}
