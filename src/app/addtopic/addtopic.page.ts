import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.page.html',
  styleUrls: ['./addtopic.page.scss'],
})
export class AddtopicPage implements OnInit {
  allTopicType = [];
  formValues: any={};
  title: any;
  topicTypeID: any;
  lectID: any;
  customAlertOptions: any = {
    header: 'Select Topic Type',
  };
  constructor(

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
           }
         }
       ]
      })
      .then(alertEl => alertEl.present());
  }

}
