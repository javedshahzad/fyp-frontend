import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController, AlertController, ModalController, IonItem, NavController } from '@ionic/angular';
import { throwIfEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.page.html',
  styleUrls: ['./student-application.page.scss'],
})
export class StudentApplicationPage implements OnInit {
  lecturerID: string;
  allApplications: any=[];

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    public modalController: ModalController,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.getData();
  }
getData(){
  this.lecturerID=localStorage.getItem('accountID');
  const formData =new FormData();
  formData.append('lectID', this.lecturerID);
  this.apiService.postData('https://fypmanagementbackend.in/studentApplicationAPI/readByLecturerID.php',formData).subscribe((res: any)=>{
    console.log(res);
    if(res.err === false){
      this.allApplications=res.data;
    }else{
      this.showAlert(res.message);
    }
  });
}

approve(projectID){
console.log(projectID);
this.showApproveAlert(projectID);
}

reject(projectID){
console.log(projectID);
this.showRejectAlert(projectID);
}
showApproveAlert(projectID){
  this.alertCtrl.create({
    header:'Are you Sure to Approve?',
    backdropDismiss:false,
    buttons: [
      {
        text: 'Cancel',
        id: 'cancel-button',
        handler: () => {
        //  console.log('Confirm Okay');
         //  this.nav.navigateBack('login');
         //  localStorage.setItem('userGroupID','');
        }
      },
      {
       text: 'Okay',
       id: 'confirm-button',
       handler: () => {
        const formData =new FormData();
        formData.append('projectID', projectID);
        this.apiService.postData('https://fypmanagementbackend.in/studentApplicationAPI/update.php',
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

showRejectAlert(projectID){
this.alertCtrl.create({
  header:'Are you Sure to Reject?',
  backdropDismiss:false,
  buttons: [
    {
     text: 'Okay',
     id: 'confirm-button',
     handler: () => {
      const formData =new FormData();
      formData.append('projectID', projectID);
      this.apiService.postData('https://fypmanagementbackend.in/ProjectAPI/delete.php',
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

showAlert(message: string) {
  this.alertCtrl
    .create({
      header: 'Alert Message',
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

async presentModal(projectData) {
  console.log(projectData);
  this.nav.navigateForward('projectdetails',{queryParams:{data:projectData}});
}
}
