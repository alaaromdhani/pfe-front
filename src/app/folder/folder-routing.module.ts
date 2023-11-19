import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AppoitmentsComponent } from './appoitments/appoitments.component';
import { TestComponent } from './test/test.component';
import { ProfileUpdaterComponent } from './profile-updater/profile-updater.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { AccountVerifiedComponent } from './account-verified/account-verified.component';
import { AuthGuard } from '../guards/auth.guard';
import { CommonGuard } from '../guards/common.guard';
import { InactiveGuard } from '../guards/inactive.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'me',
    component:ProfileComponent,
    canActivate:[CommonGuard]
  },
  {
    path: 'update-profile',
    component:ProfileUpdaterComponent,
    canActivate:[CommonGuard]
  },
  {
      path: 'appoitments',
      component: AppoitmentsComponent,
      canActivate:[AuthGuard]
   
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate:[AuthGuard]
 
  },
  {
    path:'blogs',
    loadChildren:()=>import('./blogs/blogs.module').then(m=>m.BlogsModule),
    canActivate:[AuthGuard]
  },
  {
    path:'staff',
    loadChildren:()=>import('./staff/staff.module').then(m=>m.StaffModule),
    canActivate:[AuthGuard]
  },
  {
    path:'medialibrary',
    loadChildren:()=>import('./media-library/media-library.module').then(m=>m.MediaLibraryModule),
    canActivate:[AuthGuard]
  
  },
  {
    path:'doctor-space',
    loadChildren:()=>import('./doctor-space/doctor-space.module').then(m=>m.DoctorSpaceModule),
    canActivate:[AuthGuard]
  },
  {
    path:'patient-space',
    loadChildren:()=>import('./patient-space/patient-space.module').then(m=>m.PatientSpaceModule),
    canActivate:[AuthGuard]
  },
  {
    path:'driver-space',
    loadChildren:()=>import('./driver-space/driver-space.module').then(m=>m.DriverSpaceModule),
    canActivate:[AuthGuard]
  },
  {
    path:'verify-account',
    component:VerifyAccountComponent,
    canActivate:[InactiveGuard]
    
    
  },
  {
    path:'account-verified',
    component:AccountVerifiedComponent,
    canActivate:[AuthGuard]

  }

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
