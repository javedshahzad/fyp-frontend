import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController:LoadingController
  ) { }

    // Show the loader for time
    showLoader() {

      this.loadingController.create({
        message: 'Please wait...',
        duration:6000,
        spinner:'circles',
        backdropDismiss:false,
        mode:'ios'
      }).then((res) => {
        res.present();
      });
  
    }
  
    // Hide the loader if already created otherwise return error
    hideLoader() {
  
      this.loadingController.dismiss().then((res) => {
        console.log('Loading dismissed!', res);
      }).catch((error) => {
        console.log('error', error);
      });
  
    }
}
