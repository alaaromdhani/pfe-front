import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { ChooseLocationComponent } from './add-mission/choose-location/choose-location.component';
import { ChooseDriverComponent } from './add-mission/choose-driver/choose-driver.component';
import { TrackMissionComponent } from './missions/track-mission/track-mission.component';
import { DriverLocationComponent } from './driver-location/driver-location.component';
import { TrackDriversComponent } from './track-drivers/track-drivers.component';


const routes:Routes = [{
  path:'driver-location',
  component:DriverLocationComponent
},
{
  path:'track-drivers',
  component:TrackDriversComponent
}]
@NgModule({
  declarations: [MissionsComponent,AddMissionComponent,ChooseLocationComponent,ChooseDriverComponent,TrackMissionComponent,TrackDriversComponent,DriverLocationComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DriverSpaceModule { }
