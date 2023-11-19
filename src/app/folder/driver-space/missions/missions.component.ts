import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Mission } from 'src/app/models/Mission';
import { DriverService } from 'src/app/services/driver.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { TrackMissionComponent } from './track-mission/track-mission.component';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent   {
  public missions:Mission[]= []
  constructor(public driverService:DriverService,public router:Router,public toastController:ToastController,public modalController:ModalController) { }

  ionViewDidEnter(){
    console.log('entred')
    this.getMissions()
  
  }
  public getMissions(){
    this.driverService.getMissions().subscribe(data=>{
      this.missions = data.data.data
    })
  }
  public activate(id:number){
    let m = this.missions.filter(i=>i.id===id)[0]
      this.driverService.updateMission(id,{active:!m.active}).subscribe(data=>{
        SuccessHandlor(this.toastController,data.message)
      })
      this.getMissions()
  
  }
  public addMission(){
      this.router.navigate(['/folder/driver-space/add-mission'])
  }
  public deleteMission(id:number){
    this.driverService.deleteMission(id).subscribe(data=>{
      SuccessHandlor(this.toastController,data.message)
    },err=>{
      HandlerError(this.toastController,err)
      
    })
  }
  public async trackMission(id:number){
      let mission = this.missions.filter(m=>m.id==id)[0]
      let modal = await this.modalController.create({
        component:TrackMissionComponent,
        componentProps:{
          mission
        }
      })
      return await modal.present()
  } 

}
