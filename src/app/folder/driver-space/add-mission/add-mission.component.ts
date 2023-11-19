import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DriverService } from 'src/app/services/driver.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { ChooseLocationComponent } from './choose-location/choose-location.component';
import { User } from 'src/app/models/User';
import { ChooseDriverComponent } from './choose-driver/choose-driver.component';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.scss'],
})
export class AddMissionComponent  implements OnInit {
  public currentLat:string=""
  public currentLang:string=""
  public missionForm:FormGroup
  public inputs = {} 
  public inputFocused:{[key:string]:boolean} = {

  }
  public choosenDriver:User|null=null
  constructor(public driverService:DriverService,public toast:ToastController,public modal:ModalController,public fb:FormBuilder,public router:Router) { 
    this.inputs = {
      message:['',Validators.required],
      lat:['',Validators.required],
      lang:['',Validators.required]
    }
    Object.keys(this.inputs).forEach(k=>{
      //@ts-ignore
      this.inputFocused[k] = false
    })    
    this.missionForm = this.fb.group(this.inputs)
  }
  public submitForm(){
    this.addMission()
  }
  public addMission(){
    let mission={}
    Object.keys(this.missionForm.controls).filter(k=>{
      return this.missionForm.controls[k].value!=''
    }).forEach(k=>{
        //@ts-ignore
        mission[k] = this.missionForm.controls[k].value
    })
    if(this.choosenDriver){
      //@ts-ignore
      mission.assigned_to = this.choosenDriver.id
    }
    this.driverService.addMission(mission).subscribe(data=>{
      SuccessHandlor(this.toast,data.message)
      this.router.navigate(['/folder/driver-space/missions'])
      
    },err=>{
      HandlerError(this.toast,err)
    })
  }
  public async chooseLocation(key:string){

    this.inputFocused['lang']=true
    this.inputFocused['lat']=true
      let modal = await this.modal.create({
        component:ChooseLocationComponent,

      })
      modal.onDidDismiss().then(res=>{
        if(res.data){
          console.log(res.data)
          this.missionForm.controls['lat'].setValue(''+res.data.lat+'') 
          this.missionForm.controls['lang'].setValue(''+res.data.lng+'') 
          
        }
        else{
          if(key==='lat'){
            this.inputFocused['lang']=false
          }
          else{
            this.inputFocused['lat']=false
          }
        }
      })
      return await modal.present()
  }
  public isInputEmpty(key:string){
    return this.missionForm.controls[key].value==='' 
  
  }
  public async  pickDriver(){
      let m = await this.modal.create({
        component:ChooseDriverComponent,
      })
      m.onDidDismiss().then(res=>{
          if(res.data){
            let u = res.data
            this.choosenDriver = u
          }
          else{
            this.choosenDriver=null
          }

        
      })
      return await m.present()

  }
  ngOnInit() {}


}
