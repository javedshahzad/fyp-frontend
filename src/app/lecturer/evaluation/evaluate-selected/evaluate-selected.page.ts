import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import * as _ from 'lodash';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-evaluate-selected',
  templateUrl: './evaluate-selected.page.html',
  styleUrls: ['./evaluate-selected.page.scss'],
})
export class EvaluateSelectedPage implements OnInit {

  courseID;
  lectProjectID;
  lectID;
  enrolID;
  roleIDS;
  studentName;
  topicTypeID;
  majorID;
  matrixNum;
  title;
  skill;
  description;
  roleID;
  allEvaluationData: any=[];
  fypmark;
  mark=[];
  sub1: any;
  sub2: any;
  sub3: any;
  sub4: any;
  sub5: any;
  sub6: any;
  projectID: any;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private activeRoute: ActivatedRoute,
    public navCtrl: NavController,
    private loadingService: LoadingService
  ) {
    this.activeRoute.queryParams.subscribe((res: any)=>{
      console.log(res);
      this.lectProjectID = res.data.lectProjectID;
      this.enrolID=res.data.enrolID;
      this.courseID=res.data.courseID;
      this.studentName= res.data.profileName;
      this.matrixNum= res.data.userName;
      this.title= res.data.title;
      this.topicTypeID = res.data.topicTypeID;
      this.majorID= res.data.majorID;
      this.skill= res.data.skill;
      this.description= res.data.description;
      this.roleID= res.data.roleID;
      this.projectID=res.data.projectID;

      // if(this.roleIDS===0){
      //   this.roleID=1;
      // }else{
      //   this.roleID=0;
      // }
      this.getEvaluationData(this.courseID);
    });
  }

  ngOnInit() {
  }

  getEvaluationData(id){
    this.loadingService.showLoader();
    const formData =new FormData();
    formData.append('courseID',id);
    this.apiService.getDataByID('https://fypmanagementbackend.in/EvaluationAPI/read.php', formData)
    .subscribe((res: any) => {
      console.log(res);
      this.loadingService.hideLoader();
      if(res.err === false){
        this.allEvaluationData=_.sortBy(res.data,['sortNum']);
        console.log(this.allEvaluationData);
      }else{
        this.showAlert(res.message);
      }
    });
  }

  onChange(event,item){
    console.log(event.target.value);
    console.log(item);
    switch (item.sortNum) {
      case '1':
        this.sub1=event.target.value;
        break;
      case '2':
        this.sub2=event.target.value;
        break;
      case '3':
        this.sub3=event.target.value;
        break;
        case '4':
          this.sub4=event.target.value;
          break;
      case '5':
        this.sub5=event.target.value;
        break;
        case '6':
          this.sub6=event.target.value;
          break;
      default:
        break;
    }
    // const selectmark = event.target.value;
    // const num = item.sortNum;

    // this.mark.push({num, selectmark});
    // console.log(this.mark);

  }
  onSubmit(){
  if(this.sub1+this.sub2+this.sub3+this.sub4+this.sub5+this.sub6){
    console.log(this.sub1+this.sub2+this.sub3+this.sub4+this.sub5+this.sub6);
    const numEvaluation = this.allEvaluationData.length;
    const sum = this.sub1+this.sub2+this.sub3+this.sub4+this.sub5+this.sub6;
     this.fypmark= (sum*100)/(numEvaluation*10);
    console.log(this.fypmark);
    this.sendEvaluationData();
  }else{
    this.showAlert('Please give numbers to all subjects');
  }

  }

  sendEvaluationData(){
    this.loadingService.showLoader();
    this.lectID=localStorage.getItem('accountID');
    console.log(this.lectID);
    console.log(this.topicTypeID);
    console.log(this.title);
    const formData =new FormData();
    formData.append('title', this.title);
    formData.append('topicTypeID', this.topicTypeID);
    formData.append('courseID', this.courseID);
    formData.append('majorID', this.majorID);
    formData.append('skill', this.skill);
    formData.append('description', this.description);
    formData.append('fypmark', this.fypmark);
    formData.append('roleID', this.roleID);
    formData.append('lectID',  this.lectID);
    formData.append('lectProjectID',  this.lectProjectID);
    formData.append('studName',  this.studentName);
    formData.append('projectID',  this.projectID);
    formData.append('enrolID',  this.enrolID);

    console.log(this.roleID);

    this.apiService.postData('https://fypmanagementbackend.in/studentEvaluationAPI/update.php',formData).subscribe((res: any)=>{
      console.log(res);
      this.loadingService.hideLoader();
      if(res.err === false){
        this.showAlert(res.message);
      }else{
        this.showAlert(res.message);
      }
    });

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
