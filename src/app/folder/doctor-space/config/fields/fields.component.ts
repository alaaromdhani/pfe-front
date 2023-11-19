import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddFieldComponent } from './add-field/add-field.component';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { ConfigService } from 'src/app/services/config.service';
import { Field } from 'src/app/models/Field';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent  implements OnInit {
  public fields:Field[] 
  public permissions:{[key:string]:string[]}

public getPermissions(){
  this.configService.getPermissions(['field']).subscribe(data=>{
    this.permissions = data.data
  },err=>{
    
  })
}
  constructor(public modalController:ModalController,public configService:ConfigService,public toast:ToastController) { }
  public async  addField(){
    let modal = await this.modalController.create({
      component:AddFieldComponent,
      componentProps:{
        add:true,
        f:{}
      }
      
    })
    modal.onDidDismiss().then(res=>{
      if(res.data){
        this.getFields()
      }
     
    })
    return await modal.present() 
  }
  public async  updateField(id:number){
    let modal = await this.modalController.create({
      component:AddFieldComponent,
      componentProps:{
        add:false,
        f:this.fields.filter(f=>f.id===id)[0]
      }
      
    })
    modal.onDidDismiss().then(res=>{
      if(res.data){
        this.getFields()
      }
     
    })
    return await modal.present() 
  }
  ngOnInit() {
    this.getPermissions()
    this.getFields()
  }
  public getFields(){
    this.configService.readFields().subscribe(data=>{
      this.fields=data.data
      
    },err=>{
      HandlerError(this.toast,err)
    })
  }
  public deleteField(id:number){
    this.configService.deleteField(id).subscribe(data=>{
      SuccessHandlor(this.toast,data.message)
      this.getFields()
    },err=>{
      HandlerError(this.toast,err)
    })
  }

}
