import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manage-evaluation',
  templateUrl: './manage-evaluation.page.html',
  styleUrls: ['./manage-evaluation.page.scss'],
})
export class ManageEvaluationPage implements OnInit {

  courseID;
  allCourseData;
  courseName='';
  evaluationID: any;
  allEvaluationData: any;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private nav: NavController,
  ) { }

  ngOnInit() {
    this.getCourseData();
  }

  getCourseData(){
    // const button = document.querySelector('ion-fab-button');
    // button.addEventListener('click', this.addTopic);
    this.apiService.getData('https://fypmanagementbackend.in/CourseAPI/read.php')
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allCourseData=res.data;
      }else{
        this.showAlert(res.message);
      }
    });
  }

  delete(id){
    this.showDeleteAlert(id);
  }
  showDeleteAlert(evaluationID){
    this.alertCtrl.create({
      header:'Are you Sure to Delete?',
      backdropDismiss:false,
      buttons: [
        {
         text: 'Okay',
         id: 'confirm-button',
         handler: () => {
          const formData =new FormData();
          formData.append('evaluationID', evaluationID);
          this.apiService.postData('https://fypmanagementbackend.in/EvaluationAPI/delete.php',
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


  changeCourse(id){
    this.courseID = id;
    const formData =new FormData();
    console.log(id);
      formData.append('courseID', id);
      this.apiService.getDataByID('https://fypmanagementbackend.in/EvaluationAPI/read.php', formData)
      .subscribe((res: any) => {
        console.log(res);
        if(res.err === false){
          this.allEvaluationData=res.data;
          console.log(this.allEvaluationData);
        }else{
          this.showAlert(res.message);
        }
      });
  }

  // getReview(assID){
  //   const formData =new FormData();
  //   formData.append('assessmentID', assID);
  //   this.apiService.getDataByID('https://fypmanagementbackend.in/AssessmentReviewAPI/read.php', formData)
  //   .subscribe((res: any) => {
  //     console.log(res);
  //     if(res.err === false){
  //       this.allAssessmentReviewData=res.data;
  //     }else{
  //       this.showAlert(res.message);
  //     }
  //   });
  // }


  addEvaluation(){
    if(this.courseID){
      this.nav.navigateForward('admin/manage-evaluation/add-evaluation',{queryParams:{courseID: this.courseID}});
    }else{
      this.showAlert('Please Select Course first');
    }
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
