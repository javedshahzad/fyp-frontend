import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  studID;
  allStudentData=[];
  projectID;
  assProgress;
  allAssessment: any=[];
  lecturerType: any=[];
  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private authProvider: AuthProvider,
    private menu: MenuController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    if(!this.authProvider.isStudent()){
      this.presentAlertConfirm();
    }else{
      this.getAssessmentData();
    }
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  getAssessmentData(){
    const formData =new FormData();
    this.studID = localStorage.getItem('accountID');
    formData.append('studID', this.studID);
    // const button = document.querySelector('ion-fab-button');
    // button.addEventListener('click', this.addTopic);

    this.apiService.getDataByID('https://fypmanagementbackend.in/ProjectAPI/read.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allStudentData=res.data;
        console.log(res.data[0].projectID);
        localStorage.setItem('projectID', res.data[0].projectID);
        this.getEnrolData(res.data[0].projectID);
        this.getLecRole(res.data[0].projectID);

      }else{
        this.showAlert(res.message);
      }
    });
  }

  getEnrolData(projectid){
    const formData =new FormData();
    this.projectID = projectid;
    formData.append('projectID', this.projectID);
    this.apiService.getDataByID('https://fypmanagementbackend.in/EnrolAPI/read.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.allAssessment=res.data;
         const result = this.allAssessment.reduce(function(r, a) {
          r[a.courseName] = r[a.courseName] || [];
          r[a.courseName].push(a);
          return r;
      }, Object.create(null));

 const fyp = _(result).map((value,key)=>{
  const length = value.length;
  let add = 0;
  value.forEach(element => {
        add = Number(element.isSubmit)+add;
      });
  const decimal = (add)/length;
  const percentage = Math.round((add)*100/length);
  const test={percentage,key,decimal};
  return test;
 }).value();
 console.log(fyp);
this.assProgress=fyp;
      }else{
        this.showAlert(res.message);
      }
    });
  }
  getLecRole(projectid){
    const formData =new FormData();
    this.projectID = projectid;
    formData.append('projectID', this.projectID);
    this.apiService.getDataByID('https://fypmanagementbackend.in/lectRoleToProjectAPI/readByID.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      if(res.err === false){
        this.lecturerType=res.data;

      }else{
        this.showAlert(res.message);
      }
    });
  }

  showAlert(message) {
    this.alertController
      .create({
        header: 'Message',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!',
      message: 'You are not login as Student,Please login.',
      mode:'ios',
      backdropDismiss:false,
      buttons: [
         {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.nav.navigateBack('login');
            localStorage.setItem('userGroupID','');
          }
        }
      ]
    });

    await alert.present();
  }
}
