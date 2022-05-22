import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminPageRoutingModule)},
  // {
  //   path: 'places',
  //   loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule),
  //   canLoad: [AuthGuard]
  // },
  // {
  //   path: 'bookings',
  //   loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsPageModule),
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'lecturer',
    loadChildren: () => import('./lecturer/lecturer.module').then( m => m.LecturerPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'search-archive',
    loadChildren: () => import('./search-archive/search-archive.module').then( m => m.SearchArchivePageModule)
  },
  {
    path: 'uploadfile',
    loadChildren: () => import('./uploadfile/uploadfile.module').then( m => m.UploadfilePageModule)
  },
  {
    path: 'projectdetails',
    loadChildren: () => import('./lecturer/projectdetails/projectdetails.module').then( m => m.ProjectdetailsPageModule)
  },
   {
    path: 'addtopic',
    loadChildren: () => import('./addtopic/addtopic.module').then( m => m.AddtopicPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
