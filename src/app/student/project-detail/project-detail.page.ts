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
  isDisble=true;
  constructor(private projectDetailService: ProjectDetailService,
    private alertCtrl: AlertController
    ) {

    }

  ngOnInit() {
    console.log(localStorage.getItem('projectID'));
    if(localStorage.getItem('projectID') === '0'){
    this.isDisble=false;
    }else{
      this.isDisble=true;
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
        this.showAlert(res.message);
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
        this.topicByLecturer=res.data;
        // this.groupTopicType(this.topicByLecturer);
      }else{
        this.showAlert(res.message);
      }
    });

  }

  groupTopicType(data){
  //   const result = this.topicByLecturer.reduce(function (r, a) {
  //     r[a.topicTypeID] = r[a.topicTypeID] || [];
  //     r[a.topicTypeID].push(a);
  //     return r;
  const result = _.findAll(this.topicByLecturer, function(o) { return o.topicTypeID ===data; });

console.log(result);

  }

  selectedTopicType(event){
    this.topicTypeID=event.target.value;
    console.log(this.topicTypeID);
    // this.groupTopicType(event.target.value);
    this.tittles.push(this.topicByLecturer.find(e =>e.topicTypeID === this.topicTypeID));
    console.log(this.tittles);
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
