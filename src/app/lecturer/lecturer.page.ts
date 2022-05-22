import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.page.html',
  styleUrls: ['./lecturer.page.scss'],
})
export class LecturerPage implements OnInit {

  roleID;
  lectID;
  courseID;
  allProjectData;
  assProgress;
  constructor(
    private alertController: AlertController,
    private nav: NavController,
    private authProvider: AuthProvider,
    private menu: MenuController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    if(!this.authProvider.isLecturer()){
      this.presentAlertConfirm();
    }
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  getSuperviseData(){
    this.roleID =0;
    this.lectID=localStorage.getItem('accountID');
    const formData =new FormData();
    formData.append('lectID', this.lectID);
    formData.append('courseID', this.courseID);
    formData.append('roleID', this.roleID);
    this.apiService.postData('https://fypmanagementbackend.in/SupervisorAPI/dashboardRead.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.allProjectData=res.data;
        const result = this.allProjectData.reduce(function(r, a) {
          r[a.profileName] = r[a.profileName] || [];
          r[a.profileName].push(a);
          return r;
      }, Object.create(null));

 const fyp = _(result).map((value,key)=>{
  const length = value.length;
  let matric ;
  let add = 0;
  value.forEach(element => {
        matric = element.userName;
        add = Number(element.isSubmit)+add;
      });
  const decimal = (add)/length;
  const percentage = Math.round((add)*100/length);
  const test={percentage,key,decimal,matric};
  return test;
 }).value();
 console.log(fyp);
this.assProgress=fyp;
      }else{
        this.showAlert(res.message);
      }
    });
  }

  changeCourse(value){
    console.log(this.courseID);
    this.getSuperviseData();
  }

  showAlert(message) {
    this.alertController
      .create({
        header: 'Alert Message',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oops!',
      message: 'You are not login as Lecturer,Please login.',
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
