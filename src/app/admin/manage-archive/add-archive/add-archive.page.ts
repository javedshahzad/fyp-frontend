import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.page.html',
  styleUrls: ['./add-archive.page.scss'],
})
export class AddArchivePage implements OnInit {
  studName;
  title;
  year;
  file: any;
  allTopicType = [];
  topicTypeID: any;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.getallData();
  }
  upload(event){
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);

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
    const formData =new FormData();
    formData.append('title', this.title);
    formData.append('files', this.file);
    formData.append('year', this.year);
    formData.append('topicTypeID', this.topicTypeID);

    this.apiService.postData('https://fypmanagementbackend.in/ArchiveAPI/create.php',formData).subscribe((res: any)=>{
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
