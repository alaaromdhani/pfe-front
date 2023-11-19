import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TrackingComponent } from './tracking/tracking.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatDoctorComponent } from './chat-doctor/chat-doctor.component';

const routes:Routes = [{
  path:'tracking',
  component:TrackingComponent,
  
},
{
  path:'courses',
  loadChildren:()=>import('./courses/courses.module').then(m=>m.CoursesModule),
  
},
{
  path:'config',
  loadChildren:()=>import('./config/config.module').then(m=>m.ConfigModule)
},
{
  path:'chat',
  component:ChatDoctorComponent
}
]

@NgModule({
  declarations: [TrackingComponent,ChatDoctorComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
   
  ]
})
export class DoctorSpaceModule { }
