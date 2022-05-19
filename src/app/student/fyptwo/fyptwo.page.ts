import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fyptwo',
  templateUrl: './fyptwo.page.html',
  styleUrls: ['./fyptwo.page.scss'],
})
export class FyptwoPage implements OnInit {

  courseID;
  studID;
  allAssessmentData;
  assessmentName ='';
  file = '';
  supervisorComment = '';
  examinerComment='';
  suApproval = '0';
  exApproval = '0';

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.getAssessmentData();
  }

  getAssessmentData(){
    const formData =new FormData();
    this.courseID = 2;
    this.studID = localStorage.getItem('accountID');
    formData.append('courseID', this.courseID);
    formData.append('studID', this.studID);
    // const button = document.querySelector('ion-fab-button');
    // button.addEventListener('click', this.addTopic);

    this.apiService.getDataByID('https://fypmanagementbackend.in/AssessmentAPI/readAllAssessmentType.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allAssessmentData=res.data;
      }else{
        this.showAlert(res.message);
      }
    });
  }

  selectedAssessment(item){
    console.log(item);
  }


  uploadFile(){

  }

  getFile(){

  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Contact your Supervisor',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
