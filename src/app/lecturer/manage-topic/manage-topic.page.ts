import { Component, OnInit } from '@angular/core';
import { ManageTopicService } from './manage-topic.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AddTopicModalPage } from '../add-topic-modal/add-topic-modal.page';

@Component({
  selector: 'app-manage-topic',
  templateUrl: './manage-topic.page.html',
  styleUrls: ['./manage-topic.page.scss'],
})
export class ManageTopicPage implements OnInit {
  lectID;
  lectTopicData;

  constructor( private manageTopicService: ManageTopicService,
    public alertController: AlertController,
    private apiService: ApiService,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.lectID = localStorage.getItem('accountID');
    console.log(this.lectID);
    const formData =new FormData();
    formData.append('lectID', this.lectID);
    // const button = document.querySelector('ion-fab-button');
    // button.addEventListener('click', this.addTopic);

    this.manageTopicService.lectTopicData('https://fypmanagementbackend.in/TopicAPI/readOnlyLecturer.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      this.lectTopicData=res.data;
      console.log(this.lectTopicData);
    });
  }

  deleteTopic(topicID){
    console.log(topicID);
    this.showDeleteAlert(topicID);
  }

  showDeleteAlert(topicID){
    this.alertController.create({
      header:'Confirmation to Delete Topic?',
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
          formData.append('topicID', topicID);
          this.apiService.postData('https://fypmanagementbackend.in/TopicAPI/delete.php',
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

  // addTopic() {
  //   thisAlert();
  // }
  async showAddModal() {
    const modal = await this.modalController.create({
      component: AddTopicModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

 

  showAlert(message: string) {
    this.alertController
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
