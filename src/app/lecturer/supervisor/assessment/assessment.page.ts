import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.page.html',
  styleUrls: ['./assessment.page.scss'],
})
export class AssessmentPage implements OnInit {
  studID;
  allAssessmentData;
  allAssessmentReviewData;
  assessmentName ='';
  file = '';
  assessmentID: any='';
  parameter: any;
  enrolID: string | Blob;
  filePath: any;

  constructor(
    private route: ActivatedRoute,
    // private router: Route,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private activeRoute:ActivatedRoute,
    private nav: NavController) {
        this.activeRoute.queryParams.subscribe((res:any)=>{
          console.log(res);
          this.enrolID=res.data.enrolID;
          this.getAssessmentData(this.enrolID);
        })
  }

  ngOnInit() {
   
  }

  getAssessmentData(enrolID){
    console.log(enrolID);
    const formData =new FormData();
    formData.append('enrolID',enrolID);
    // const button = document.querySelector('ion-fab-button');
    // button.addEventListener('click', this.addTopic);

    this.apiService.getDataByID('https://fypmanagementbackend.in/AssessmentAPI/readAllAssessmentByEnrolID.php', formData)
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
    this.getReview(item.assessmentID);
    console.log(item);
    this.assessmentName = item.assessmentName;
    this.file = item.fileName;
    this.assessmentID=item.assessmentID;
    this.filePath=item.path;
    console.log(this.filePath)
  // this.supervisorComment = item.;
  // this.examinerComment='';
  // this.suApproval = '0';
  // this.exApproval = '0';
  }
  openfile(path){
    window.open(path,'_blank')
  }
  getReview(assID){
    const formData =new FormData();
    formData.append('assessmentID', assID);
    this.apiService.getDataByID('https://fypmanagementbackend.in/AssessmentReviewAPI/read.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allAssessmentReviewData=res.data;
        console.log(this.allAssessmentReviewData)
      }else{
        this.showAlert(res.message);
      }
    });
  }


async giveReview(item){
    console.log(item);
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Please write your good opnion',
        inputs: [
          {
            name: 'lectComment',
            type: 'text',
            placeholder: 'Please give your reviews'
          },
         
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log(data);
              const formData =new FormData();
              formData.append('lectComment', data.lectComment);
              formData.append('assessmentID', item.assessmentID);
              formData.append('approvalID', '1');
              this.apiService.postData('https://fypmanagementbackend.in/AssessmentReviewAPI/update.php',formData).subscribe((res:any)=>{
                console.log(res);
                if(res.err === false){
                  this.showAlert(res.message);
                }else{
                  this.showAlert(res.message);
                }
              })

            }
          }
        ]
      });
  
      await alert.present();
  
  


    // if(this.assessmentID){
    //   this.nav.navigateForward('uploadfile',{queryParams:{assessmentID: this.assessmentID}});
    // }else{
    //   this.showAlert('Please select project first');
    // }
  }

  getFile(){

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
