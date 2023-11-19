import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Permission } from 'src/app/models/Permission';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { StaffService } from 'src/app/services/staff.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-set-permissions',
  templateUrl: './set-permissions.component.html',
  styleUrls: ['./set-permissions.component.scss'],
})
export class SetPermissionsComponent  implements OnInit {
  public user:User
  public role:Role
  public add:boolean
  public rolesPermissions:Permission[]=[]

  public userPermissions:Permission[] =  []


  public value:string=""
  public setPermissionsForm:FormGroup
 
  public inputFocused:{[key:string]:boolean} = {

  }
  public actionExpanded:{
    [key:string]:boolean
  } ={} 
  public models:string[]=[]
  public inputs = {
    weight:['',Validators.required],
    name:['',Validators.required],
    
 
  }
// public photo = 'assets/images/m.png'
  public Upermissions:{[key:string]:string[]}={}
  public Rpermissions:{[key:string]:string[]}={}
  constructor(public fb:FormBuilder,public staffService:StaffService,public toastController:ToastController,public modalController:ModalController) {
   
    Object.keys(this.inputs).forEach(k=>{
      this.inputFocused[k] = false
    })    
    this.setPermissionsForm = this.fb.group(this.inputs)
    
  }


  public hasAction(model:string,action:string){
    
    return this.Rpermissions[model]&&this.Rpermissions[model].length &&this.Rpermissions[model].includes(action)
  }
  
  public submitForm(){
    if(!this.add){
      let role = {}
      Object.keys(this.setPermissionsForm.controls).filter(k=>this.setPermissionsForm.controls[k].value!='').forEach(k=>{
        //@ts-ignore
        role[k]=this.setPermissionsForm.controls[k].value
  
      })
      //@ts-ignore
      if(role['weight']){
    //@ts-ignore
        role['weight'] = parseInt(role['weight'])
      }
      //@ts-ignore
      role['weight'] =role['weight']?role['weight']:this.role.weight 
      //@ts-ignore
      role['name'] =role['name']?role['name']:this.role.name 
    
      //@ts-ignore
      role['permissions'] = []
      Object.keys(this.Rpermissions).forEach(m=>{
        //@ts-ignore
        role['permissions'].push({model:m,actions:this.Rpermissions[m]})
  
      })
        //@ts-ignore
         this.staffService.updateRole(this.role.id||0,role).subscribe(data=>{
  
            SuccessHandlor(this.toastController,data.message)
            this.modalController.dismiss(role,'dropdown')
         },err=>{
            HandlerError(this.toastController,err)
            this.modalController.dismiss(role,'dropdown')
          })
    }
    else{
      let role = {}
      Object.keys(this.setPermissionsForm.controls).filter(k=>this.setPermissionsForm.controls[k].value!='').forEach(k=>{
        //@ts-ignore
        role[k]=this.setPermissionsForm.controls[k].value
  
      })
      //@ts-ignore
      if(role['weight']){
        //@ts-ignore
        role['weight'] = parseInt(role['weight'])
      }
      this.staffService.createRole(role).subscribe(data=>{
        SuccessHandlor(this.toastController,data.message)
        this.modalController.dismiss(role,'dropdown')
      },err=>{
        HandlerError(this.toastController,err)
        this.modalController.dismiss(role,'dropdown')
    
      })
    }
  }
  ngOnInit() {
     //@ts-ignore
     this.userPermissions =  this.user.Permissions
     //@ts-ignore
     this.rolesPermissions =  this.role.Permissions
  
    //console.log(this.user)
    this.initPermissions()

    //console.log(this.Upermissions)
  }
  public expandActions(model:string){
    console.log(this.haveAllActions(model))
    console.log('clicked')
    if(this.actionExpanded[model]){
      this.actionExpanded[model]=false
    }
    else{
      this.actionExpanded[model] = true
      this.models.filter(m=>m!=model).forEach(m=>{
        this.actionExpanded[m]=false
      })
    }

  }
  public initExpanded(){
    this.models.forEach(m=>{
      this.actionExpanded[m]=false

    })
  }
  public initPermissions(){

    this.userPermissions.forEach(p=>{
      //@ts-ignore
      let model = p.Model.name
       
       if(this.Upermissions[model]){
        this.Upermissions[model].push(p.action)
        
      }
      else{
        this.models.push(model)
        let actions = [p.action]
        this.Upermissions[model]=actions   
      }
    })
    this.rolesPermissions.forEach(p=>{
     //@ts-ignore 
      let model = p.Model.name
       
      if(this.models.includes(model)){
        if(this.Rpermissions[model]){
          this.Rpermissions[model].push(p.action)
          
        }
        else{
          
          let actions = [p.action]
          this.Rpermissions[model]=actions   
        }
      }
    })

  }
  public handleAction(model:string,action:string){
    console.log(model)
    if(!this.Rpermissions[model]||!this.Rpermissions[model].length){
      this.Rpermissions[model] = [action]
      return  
    }
    
    if(!this.Rpermissions[model].includes(action) ){
      this.Rpermissions[model].push(action)
      return 
    }
    this.Rpermissions[model] = this.Rpermissions[model].filter(a=>a!=action)
    
  }
  public haveAllActions(model:string){
    return this.Upermissions[model].every(action=>this.Rpermissions[model] &&this.Rpermissions[model].includes(action))
  }
  public closeModal(){
    this.modalController.dismiss()
  }
  

}
