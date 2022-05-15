import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  // @ViewChild('Nav') nav: NavController;
  rootPage: any = MenuPage;
  pages =[];
  profileName = '';
  email = '';

  constructor(public navCtrl: NavController,
    private authProvider: AuthProvider,
    private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private menu: MenuController) {
      this.menu.enable(true,'menu');
      this.initializeApp();
    }

  ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewWillEnter(){
    if (this.authProvider.isAdmin()){
      this.pages = [
        { title: 'Admin Dashboard', page:'/admin', icon: 'home',},
        { title: 'Admin Profile', page:'/profile'},
        { title: 'Manage Account', page:'/admin/manage-account', icon: 'home',},
      ];
      this.openPage('/admin');
    } else if(this.authProvider.isLecturer()){
      this.pages = [
        { title: 'Lecturer Dashboard', page:'/lecturer', icon: 'home'},
        { title: 'Lecturer Profile', page:'/profile'},
        { title: 'Student Application', page:'/lecturer/student-application'},
        { title: 'Examine Topic', page:'/lecturer/examine-topic'},
        { title: 'Supervisor', page:'/lecturer/supervisor'},
        { title: 'Examiner', page:'/lecturer/examiner'},
        { title: 'Evaluation', page:'/lecturer/evaluation'},
        { title: 'Search Archive', page:'/search-archive'},

      ];
      this.openPage('/lecturer');
    }else if(this.authProvider.isStudent()){
      this.pages = [
        { title: 'Student Dashboard', page:'/student', icon: 'home'},
        { title: 'Student Profile', page:'/profile'},
        {title: 'Project Detail', page:'/student/project-detail'},
        {title: 'FYP1', page:'/student/fypone'},
        {title: 'FYP2', page:'/student/fyptwo'},
        { title: 'Search Archive', page:'/search-archive'},
      ];
      this.openPage('/student');
    }
    this.profileName = this.authProvider.currentUser.profileName;
    this.email = this.authProvider.currentUser.email;
  }

  openPage(page){
    this.router.navigateByUrl(page);
  }

  logout(){
    this.authProvider.logout();
    this.router.navigateByUrl('/login');
  }

  ionViewCanEnter(){
    return this.authProvider.isLoggedIn();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
