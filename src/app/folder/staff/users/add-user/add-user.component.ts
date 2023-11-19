import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ProfilePhotoOptionComponent } from 'src/app/folder/profile-updater/profile-photo-option/profile-photo-option.component';
import { Field } from 'src/app/models/Field';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { ConfigService } from 'src/app/services/config.service';
import { StaffService } from 'src/app/services/staff.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { mimeToExtension } from 'src/utils/constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent  {
  public fields :Field[]
  public expanded=false
  public value:string=""
  public addUserForm:FormGroup
  
  public inputFocused:{[key:string]:boolean} = {

  }
  public roles:Role[]=[]
  selectedField:{[key:string]:boolean}={

  }
  public selectedFields :Field[] = []
  public inputs = {
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',Validators.required],
    phonenumber:['',Validators.required],
    role_id:['',Validators.required],
    password:['',Validators.required]
   }
   public selectedRole=0
  public photo = 'assets/images/m.png'
   public user:User
  
  public changedProfilePict=false
  constructor(private modalController: ModalController,public fb:FormBuilder,public staffService:StaffService,public toastController:ToastController,public router:Router,public activatedRoute:ActivatedRoute,public configService:ConfigService) { 
  
    Object.keys(this.inputs).forEach(k=>{
      this.inputFocused[k] = false
    })    
    this.addUserForm = this.fb.group(this.inputs)

  }
  public submitForm(){
    if(!this.user){
      this.addUser()
    }else{
      this.updateUser()
    }
  }
  ionViewDidEnter() {
   // console.log(this.selectedFields)
    this.staffService.getRoles().subscribe(data=>{
      this.roles = data.data.data
    },err=>{
      HandlerError(this.toastController,err)
    })
    this.activatedRoute.params.subscribe(data=>{
      if(data['id']){
        this.staffService.findOneUser(data['id']).subscribe(data=>{
          this.user = data.data
          this.photo = this.user.profilePicture
          this.getFields()
        })
        

      }

    })
   
 
  }
  async openOptionSelection(){
    const modal = await this.modalController.create({
      component:ProfilePhotoOptionComponent,
      cssClass: 'transparent-modal'


    })
    modal.onDidDismiss()
    .then(res => {
      

        if(res.data && typeof res.data==='string' && res.data!='undefined'){
          this.photo =res.data
          
          this.changedProfilePict = true
        }
        
    });
    return await modal.present();

  }
  public selectRole(){

  }
  public addUser(){
    let user={}
    Object.keys(this.addUserForm.controls).filter(k=>{
      return this.addUserForm.controls[k].value!=''
    }).forEach(k=>{
      //@ts-ignore
      user[k]=this.addUserForm.controls[k].value
    })
    //@ts-ignore
    if(user['phonenumber']){
   //@ts-ignore
      user['phonenumber'] = parseInt(user['phonenumber'])
    }
    //@ts-ignore
    if(!user['role_id']){
      HandlerError(this.toastController,{error:{message:'role selection is required'}})
    }else{
      //@ts-ignore
      user['role_id']=parseInt(user['role_id'])
      this.staffService.addUser(user).subscribe(data=>{
        SuccessHandlor(this.toastController,data.message)
        this.router.navigate(['/folder/staff/users/read-users'])
      },err=>{
        HandlerError(this.toastController,err)
   //     this.router.navigate(['/folder/staff/users/read-users'])
      })
    }
    
    

  }
  public updateUser(){
    let formdata = new FormData()
    Object.keys(this.addUserForm.controls).filter(k=>{
      return this.addUserForm.controls[k].value!=''
    }).forEach(k=>{
      
      formdata.append(k,this.addUserForm.controls[k].value)
    })
    
    if(this.user.Role?.name==='Doctor'){
      let fields = this.selectedFields.map(f=>f.id)
      formdata.append('fields',JSON.stringify(fields))
    }
    if(this.photo && this.photo.startsWith('blob')){
        fetch(this.photo).then(res=>{
          return res.blob()
        }).then(blobData=>{
          const memeType = blobData.type
          //@ts-ignore
          formdata.append('pp',blobData,'file'+mimeToExtension[memeType]?'jpg':'')
          this.staffService.updateUser(this.user.id,formdata).subscribe(data=>{
            SuccessHandlor(this.toastController,data.message)
            this.router.navigate(['/folder/staff/users/read-users'])
          },err=>{
           HandlerError(this.toastController,err)
          })
        })
        
      }
      else{
        this.staffService.updateUser(this.user.id,formdata).subscribe(data=>{
          SuccessHandlor(this.toastController,data.message)
          this.router.navigate(['/folder/staff/users/read-users'])
        },err=>{
         HandlerError(this.toastController,err)
        })
      }
      
  }
  public discardPicture(){
   
    this.changedProfilePict = false
    this.photo = this.user?this.user.profilePicture:'assets/images/m.png'
  }
  public change(){
    if(this.changedProfilePict){
      this.discardPicture()
    }
    else{
      this.openOptionSelection()
    }
  }
  public expandFieldsSection(){
      
      this.expanded?this.expanded=false:this.expanded=true
  }
  public getFields(){
    this.selectedFields=[]
    this.configService.readFields().subscribe(data=>{
      this.fields = data.data
      this.fields.forEach(f=>{
        if(this.user.Fields.map(f=>f.id).includes(f.id)){
          this.selectedField[f.id]=true
          this.selectedFields.push(f)
        }
        else{
          this.selectedField[f.id]=false
        }
        
        
      })

    },err=>{
      HandlerError(this.toastController,err)
    })
  }
  selectField(id:number){
    if(this.selectedField[id]){
      this.selectedField[id]=false
      //@ts-ignore
      this.selectedFields = this.selectedFields.filter(f=>f.id!==id)
    }
    else{
      this.selectedField[id]=true
      //@ts-ignore
      this.selectedFields.push(this.fields.filter(f=>f.id===id).at(0))
    }
    //console.log(this.selectedFields)
  }
 

}
