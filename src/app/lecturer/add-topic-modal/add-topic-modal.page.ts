import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-topic-modal',
  templateUrl: './add-topic-modal.page.html',
  styleUrls: ['./add-topic-modal.page.scss'],
})
export class AddTopicModalPage implements OnInit {
  allTopicType = [];
  formValues: any={};
  title:any;
  topicTypeID: any;
  lectID: any;
  customAlertOptions: any = {
    header: 'Select Title',
  };
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private apiService: ApiService,
    private alertCtrl: AlertController,
  ) {
    this.getallData();
   }

  ngOnInit() {

 
  }
  getallData(){
    this.apiService.getData('https://fypmanagementbackend.in/topicTypeAPI/read.php').subscribe((res: any)=>{
      console.log(res);
      if(res){
        this.allTopicType=res;
      }
    });
  }
   dismissModal() {
    // const onClosedData: string = "Wrapped Up!";
     this.modalController.dismiss();
  }

  onSubmit() {
    this.lectID=localStorage.getItem('accountID');
    console.log(this.lectID);
    console.log(this.topicTypeID);
    console.log(this.title);
    const formData =new FormData();
    formData.append('title', this.title);
    formData.append('topicTypeID', this.topicTypeID);
    formData.append('lectID',  this.lectID);

    this.apiService.postData('https://fypmanagementbackend.in/TopicAPI/create.php',formData).subscribe((res: any)=>{
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
