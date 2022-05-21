import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController, AlertController, ModalController, IonItem, PopoverController, NavController } from '@ionic/angular';
import { ModalPage } from 'src/app/modal/modal.page';

@Component({
  selector: 'app-examine-topic',
  templateUrl: './examine-topic.page.html',
  styleUrls: ['./examine-topic.page.scss'],
})
export class ExamineTopicPage implements OnInit {
  lecturerID: string;
  allProject: any=[];
  // dataReturned: any;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    public modalController: ModalController,
    public popOverController: PopoverController,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.getData();
  }
getData(){
  const formData =new FormData();
        formData.append('lectID',localStorage.getItem('accountID'));
  this.apiService.getDataByID('https://fypmanagementbackend.in/ExamineTopic/read.php',formData).subscribe((res: any)=>{
    console.log(res);
    if(res.err === false){
      this.allProject=res.data;
    }
  });
}

enrol(projectID,studID){
console.log(projectID);
this.showEnrolAlert(projectID,studID);
}

showEnrolAlert(projectID,studID){
  this.alertCtrl.create({
    header:'Confirmation to Examine this Project?',
    backdropDismiss:false,
    buttons: [
      {
        text: 'Cancel',
        id: 'cancel-button',
        handler: () => {
        }
      },
      {
       text: 'Okay',
       id: 'confirm-button',
       handler: () => {
        const formData =new FormData();
        formData.append('projectID', projectID);
        formData.append('studID',studID);
        formData.append('lectID',localStorage.getItem('accountID'));
        this.apiService.postData('https://fypmanagementbackend.in/ExamineTopic/update.php',
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
    this.nav.navigateForward('projectdetails',{queryParams:{data:projectData}});
  // const modal = await this.modalController.create({
  //   cssClass: 'my-custom-class',
  //   component: ModalPage,
  //   componentProps: {
  //     studName: projectData.profileName,
  //     matrixNo: projectData.userName,
  //     email: projectData.email,
  //     phoneNum: projectData.phoneNum,
  //     title: projectData.title,
  //     topicType: projectData.topicTypeName,
  //     skill: projectData.skill,
  //     problemStmt: projectData.problemStmt,
  //     objective: projectData.objective,
  //     outcome: projectData.outcome,
  //     description: projectData.description
  //   }
  // });
  // if(modal){
  //   return await modal.present();
  // }

}
}
