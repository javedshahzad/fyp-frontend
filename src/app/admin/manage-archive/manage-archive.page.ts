import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manage-archive',
  templateUrl: './manage-archive.page.html',
  styleUrls: ['./manage-archive.page.scss'],
})
export class ManageArchivePage implements OnInit {
  archiveData;
  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private nav: NavController,
  ) { }

  ngOnInit() {
    this.getArchiveData();
  }

  delete(id){
    this.showDeleteAlert(id);
  }
  showDeleteAlert(archiveID){
    this.alertCtrl.create({
      header:'Are you Sure to Delete?',
      backdropDismiss:false,
      buttons: [
        {
         text: 'Okay',
         id: 'confirm-button',
         handler: () => {
          const formData =new FormData();
          formData.append('archiveID', archiveID);
          this.apiService.postData('https://fypmanagementbackend.in/ArchiveAPI/delete.php',
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

    showAlert(message: string) {
      this.alertCtrl
        .create({
          header: 'Alert Message',
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
  getArchiveData(){
    this.apiService.getData('https://fypmanagementbackend.in/ArchiveAPI/read.php').subscribe((res: any)=>{
      if(res.err === false){
        this.archiveData=res.data;
        console.log(this.archiveData);
      }
    });
  }

  addArchive(){
      this.nav.navigateForward('admin/manage-archive/add-archive');
}
}
