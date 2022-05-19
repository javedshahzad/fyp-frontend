import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController, AlertController, ModalController, IonItem } from '@ionic/angular';
import { ModalPage } from 'src/app/modal/modal.page';
import { ProjectdetailsPage } from 'src/app/projectdetails/projectdetails.page';


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
    }
  });
}

approve(projectID){
console.log(projectID);
this.showApproveAlert(projectID);
// const formData =new FormData();
//   formData.append('projectID', projectID);
//   this.apiService.postData('https://fypmanagementbackend.in/studentApplicationAPI/readByLecturerID.php',formData).subscribe((res: any)=>{
//     console.log(res);
//       if(res.err === false){
//         this.showAlert(res.message);
//       }else{
//         this.showAlert(res.message);
//       }
//   });
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
      this.apiService.postData('https://fypmanagementbackend.in/studentApplicationAPI/readByLecturerID.php',
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

async presentModal(projectData) {
  console.log(projectData);
const modal = await this.modalController.create({
  cssClass: 'my-custom-class',
  component: ProjectdetailsPage,
  componentProps: {
    studName: projectData.profileName,
    matrixNo: projectData.userName,
    email: projectData.email,
    phoneNum: projectData.phoneNum,
    title: projectData.title,
    topicType: projectData.topicTypeName,
    skill: projectData.skill,
    problemStmt: projectData.problemStmt,
    objective: projectData.objective,
    outcome: projectData.outcome,
    description: projectData.description
  }
});

return await modal.present();
}
}
