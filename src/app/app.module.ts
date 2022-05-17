import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthProvider } from 'src/providers/auth/auth';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddTopicModalPageModule } from './lecturer/add-topic-modal/add-topic-modal.module';
import { ModalPageModule } from './modal/modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule,AddTopicModalPageModule,ModalPageModule, HttpClientModule, FormsModule,IonicModule.forRoot(), AppRoutingModule],
  providers: [
    Platform,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
