import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.page.html',
  styleUrls: ['./add-evaluation.page.scss'],
})
export class AddEvaluationPage implements OnInit {
  name: any;
  evDescription;
  sortNum;
  courseID;
  evData;
  evaluationID;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private activeRoute: ActivatedRoute,
    public navCtrl: NavController,
  ) {
    this.activeRoute.queryParams.subscribe((res: any)=>{
      this.evData = res.review;
      console.log(this.evData);
      this.evaluationID = this.evData.evaluationID;
      this.name = this.evData.Name;
      this.evDescription = this.evData.evDescription;
      this.sortNum = this.evData.sortNum;
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    const formData =new FormData();
    formData.append('evaluationID', this.evaluationID);
    formData.append('Name', this.name);
    formData.append('evDescription', this.evDescription);
    formData.append('courseID', this.courseID);
    formData.append('sortNum', this.sortNum);

    this.apiService.postData('https://fypmanagementbackend.in/EvaluationAPI/update.php',formData).subscribe((res: any)=>{
      console.log(res);
      if(res.err === false){
        this.showAlert(res.message);
      }else{
        this.showAlert(res.message);
      }
    });
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
