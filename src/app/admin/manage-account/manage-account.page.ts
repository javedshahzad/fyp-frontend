import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.page.html',
  styleUrls: ['./manage-account.page.scss'],
})
export class ManageAccountPage implements OnInit {
  userGroupID;

  allAccount: any;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private nav: NavController,
  ) { }

  ngOnInit() {
    // this.getCourseData();
  }

  delete(id){
    this.showDeleteAlert(id);
  }
  showDeleteAlert(accountID){
    this.alertCtrl.create({
      header:'Are you Sure to Delete?',
      backdropDismiss:false,
      buttons: [
        {
         text: 'Okay',
         id: 'confirm-button',
         handler: () => {
          const formData =new FormData();
          formData.append('accountID', accountID);
          this.apiService.postData('https://fypmanagementbackend.in/AccountAPI/delete.php',
          formData).subscribe((res: any)=>{
            console.log(res);
              if(res.err === false){
                this.showAlert(res.message);
              }else{
                this.showAlert(res.message);
              }
          });
         }
       }
     ]
    })
    .then(alertEl => alertEl.present());
    }


  changeGroup(id){
    this.userGroupID = id;
    const formData =new FormData();
      formData.append('userGroupID', this.userGroupID);
      this.apiService.getDataByID('https://fypmanagementbackend.in/AccountAPI/readByUserGroupID.php', formData)
      .subscribe((res: any) => {
        console.log(res);
        if(res.err === false){
          this.allAccount=res.data;
          console.log(this.allAccount);
        }else{
          this.showAlert(res.message);
        }
      });
  }

updateAccount(event){
  console.log(event);
  this.nav.navigateForward('admin/manage-account/update-account',{queryParams:{userData: event}});
}

addAccount(){
  if(this.userGroupID){
    this.nav.navigateForward('admin/manage-account/add-account',{queryParams:{userGroupID: this.userGroupID}});
  }else{
    this.showAlert('Please Select Role first');
  }
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Message',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
