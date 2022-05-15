import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { ProjectDetailService } from './project-detail.service';
import * as _ from 'lodash';

import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  topic;
  lecturers;
  selectedLecturer;
  lectID;
  topicID;
  public projectForm: FormGroup;
  LectererID: any;
  TopicByLecturer: any=[];
  formValues: any={};
  constructor(private projectDetailService: ProjectDetailService,
    private alertCtrl:AlertController
    ) { }

  ngOnInit() {
    console.log(localStorage.accountID);

    this.projectDetailService.getTopic()
      .subscribe(data => {
        console.log(data)
        this.topic=data;
        this.lecturers= _.groupBy(this.topic,'lectName');

      console.log(this.lecturers);
        console.log(this.topic);
      }, error => console.log(error));
  }
  save(form) {
    console.log(form);
    // this.registerService
    // .createUser(form)
    // .subscribe(data => {
    //   this.user = new User();
    // },
    // error => console.log(error));
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.formValues=form.value;
    this.formValues.studID=localStorage.getItem('accountID');
    console.log(this.formValues);
    const formData =new FormData();
    formData.append('title', this.formValues.title);
    formData.append('topicTypeID', this.formValues.topicTypeID);
    formData.append('skill', this.formValues.skill);
    formData.append('objective', this.formValues.objective);
    formData.append('lectID', this.formValues.outcome);
    formData.append('problemstmt', this.formValues.problemstmt);
    formData.append('outcome', this.formValues.outcome);
    formData.append('description', this.formValues.description);
    formData.append('studID', "1236");

    this.projectDetailService.postData('https://fypmanagementbackend.in/ProjectAPI/create.php',formData).subscribe((res:any)=>{
      console.log(res);
      if(res.err === false){
        this.showAlert(res.message);
      }else{
        this.showAlert(res.message);
      }
    })
  }
  selectedLecrurer(event){
    console.log(event.target.value);
    this.LectererID=event.target.value;
    const formData =new FormData();
    formData.append('lectID', this.LectererID);
    this.projectDetailService.postData('https://fypmanagementbackend.in/TopicAPI/readOnlyLecturer.php',formData).subscribe((res:any)=>{
      console.log(res)
      if(res.err === false){
        this.TopicByLecturer=res.data;
      }else{
        this.showAlert(res.message);
      }
    })

  }
   showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Created success',
        message,
        backdropDismiss:false,
        mode:"ios",
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
