import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProjectDetailService } from './project-detail.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  topicType;
  constructor(private projectDetailService: ProjectDetailService) { }

  ngOnInit() {
    console.log(localStorage.accountID);

    this.projectDetailService.getTopic()
      .subscribe(data => {
        this.topicType=data;
        console.log(this.topicType);
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
    // form.value.userGroupID=2;
    // form.value.studLimit=0;
    // form.value.majorID=this.user.majorID;
    // console.log(form.value);
    // this.submitted = true;
    // this.user.userGroupID=2;
    // this.user.studLimit=0;
    this.save(form.value);
  }
}
