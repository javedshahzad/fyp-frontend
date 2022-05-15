import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  public appPages = [];
  //  [
  //   { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  profileName: string;
  email: string;
  userName: string='';
  constructor(
    public navCtrl: NavController,
    private authProvider: AuthProvider,
    private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private menu:MenuController,
    private api:ApiService
  ) {
    this.api.isupdateLogin.subscribe(_isLogin=>{
      this.loadMenu();
      this.userName=localStorage.getItem('userName');
    })
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadMenu();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loadMenu(){
    console.log(this.authProvider.isAdmin())
    console.log(this.authProvider.isLecturer())
    console.log(this.authProvider.isStudent())
    if (this.authProvider.isAdmin()){
      this.appPages = [
        { title: 'Admin Dashboard', url:'/admin', icon: 'home',},
        { title: 'Admin Profile', url:'/profile', icon: 'person'},
        { title: 'Manage Account', url:'/admin/manage-account', icon: 'home',},
      ];
      // this.openPage('/admin');
    } else if(this.authProvider.isLecturer()){
      this.appPages = [
        { title: 'Lecturer Dashboard', url:'/lecturer', icon: 'home'},
        { title: 'Lecturer Profile', url:'/profile',icon: 'home'},
        { title: 'Student Application', url:'/lecturer/student-application',icon: 'home'},
        { title: 'Examine Topic', url:'/lecturer/examine-topic',icon: 'home'},
        { title: 'Supervisor', url:'/lecturer/supervisor',icon: 'home'},
        { title: 'Examiner', url:'/lecturer/examiner',icon: 'home'},
        { title: 'Evaluation', url:'/lecturer/evaluation',icon: 'home'},
        { title: 'Search Archive', url:'/search-archive',icon: 'home'},

      ];
      // this.openPage('/lecturer');
    }else if(this.authProvider.isStudent()){
      this.appPages = [
        { title: 'Student Dashboard', url:'/student', icon: 'home'},
        { title: 'Student Profile', url:'/profile',icon: 'home'},
        {title: 'Project Detail', url:'/student/project-detail',icon: 'home'},
        {title: 'FYP1', url:'/student/fypone',icon: 'home'},
        {title: 'FYP2', url:'/student/fyptwo',icon: 'home'},
        { title: 'Search Archive', url:'/search-archive',icon: 'home'},
      ];
      // this.openPage('/student');
    }
    // this.profileName = this.authProvider.currentUser.profileName;
    // this.email = this.authProvider.currentUser.email;
  }

  openPage(page){
    this.router.navigateByUrl(page);
  }

  logout(){
    this.authProvider.logout();
    this.menu.close();
    // this.router.navigateByUrl('/login');
  }

  // ionViewCanEnter(){
  //   return this.authProvider.isLoggedIn();
  // }

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  // openEnd() {
  //   this.menu.open('end');
  // }

  // openCustom() {
  //   this.menu.enable(true, 'custom');
  //   this.menu.open('custom');
  // }
}
