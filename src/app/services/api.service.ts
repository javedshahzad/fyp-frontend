import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isupdateLogin = new BehaviorSubject(true);
  constructor(
    public http: HttpClient,
    private toastController: ToastController
  ) { }

  postData(url,data){
    return this.http.post(url, data);
  }

  getDataByID(url,data){
    return this.http.post(url,data);
  }
  getData(url){
    return this.http.get(url);
  }
 async showtoast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color:'secondary'
    });
    toast.present();
  }

}
