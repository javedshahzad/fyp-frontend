import { Component, OnInit } from '@angular/core';

import { FormGroup, NgForm } from '@angular/forms';
import { ProjectDetailService } from './project-detail.service';
import * as _ from 'lodash';

import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  // topic=[];
  lecturers;
  selectLecturer;
  selectTopicType;
  lectID;
  topicID;
  topicTypeID;
  groupType;
  titleList;
  allTopicTypeData;
  public projectForm: FormGroup;
  lecturerID: any;
  topicByLecturer: any=[];
  formValues: any={};
  tittles: any=[];
  isDisble;
  id;
  allTopic;
  userProfileName: any;
  userAccountId: string;
  userEmail;
  constructor(private projectDetailService: ProjectDetailService,
    private alertCtrl: AlertController,
    private apiService: ApiService,
    public nav: NavController
    ) {

    }

  ngOnInit() {
    console.log(localStorage.getItem('projectID'));
    this.id=localStorage.getItem('projectID');
    if(this.id !== '0'){
    this.isDisble=true;
    }else{
      this.isDisble=false;
    }

    this.projectDetailService.getLecturer()
    .subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.lecturers=res.data;
      }else{
        this.showAlert(res.message);
      }
    });
  }
  save(form) {
    console.log(form);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.formValues=form.value;
    this.formValues.studID=localStorage.getItem('accountID');
    console.log(this.formValues);
    console.log(this.lecturerID);
    const formData =new FormData();
    formData.append('title', this.formValues.title);
    formData.append('topicTypeID', this.formValues.topicTypeID);
    formData.append('skill', this.formValues.skill);
    formData.append('objective', this.formValues.objective);
    formData.append('outcome', this.formValues.outcome);
    formData.append('problemstmt', this.formValues.problemstmt);
    formData.append('outcome', this.formValues.outcome);
    formData.append('description', this.formValues.description);
    formData.append('studID', this.formValues.studID);
    formData.append('lectID',  this.lecturerID);

    this.projectDetailService.postData('https://fypmanagementbackend.in/ProjectAPI/create.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.sendMail();
      }else{
        this.showAlert(res.message);
      }
    });
  }
  selectedLecturer(event){
    console.log(event.target.value);
    this.lecturerID=event.target.value;
    const formData =new FormData();
    formData.append('lectID', this.lecturerID);
    this.projectDetailService.postData('https://fypmanagementbackend.in/TopicAPI/readOnlyLecturer.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.titleList=res.data;
        this.groupTopicType();
      }else{
        this.showAlert(res.message);
      }
    });

  }

  groupTopicType(){
    this.allTopic = this.titleList.reduce(function(r, a) {
      r[a.topicTypeID] = r[a.topicTypeID] || [];
      r[a.topicTypeID].push(a);
      return r;
  }, Object.create(null));

  this.topicByLecturer = _(this.allTopic).map((value,key)=>{

let name = '';
let title ='';
value.forEach(element => {
    name = element.topicTypeName;
    title = element.title;
  });
const test={key,name};
return test;
}).value();
}

  selectedTopicType(event){
    this.tittles=[];
    this.topicTypeID=event.target.value;
    console.log(this.topicTypeID);
    let title;
    this.tittles.push(this.allTopic[this.topicTypeID]);
  }
  selectedTittles(ev){
    console.log(ev.target.value);
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
           }
         }
       ]
      })
      .then(alertEl => alertEl.present());
  }

  sendMail(){
    this.userEmail=localStorage.getItem('email');
    this.userProfileName=localStorage.getItem('profileName');
    this.userAccountId=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('accountID', this.userAccountId);
    formData.append('profileName', this.userProfileName);
    formData.append('email', this.userEmail);
    this.apiService.postData('https://fypmanagementbackend.in/SendMailNotification/applicationMail.php',formData).subscribe((res: any)=>{
    console.log(res);
    if(res.err === false){
      this.presentAlertConfirm('Application is send');
    }else{
      this.presentAlertConfirm(res.message);
    }
    });

  }

  async presentAlertConfirm(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Message',
      message: msg,
      mode:'ios',
      backdropDismiss:false,
      buttons: [
         {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.nav.navigateForward('/student');
          }
        }
      ]
    });

    await alert.present();
  }
}
