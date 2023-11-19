import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProfilePhotoOptionComponent } from './profile-photo-option/profile-photo-option.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { mimeToExtension } from 'src/utils/constants';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-profile-updater',
  templateUrl: './profile-updater.component.html',
  styleUrls: ['./profile-updater.component.scss'],
})
export class ProfileUpdaterComponent {
  public value:string=""
  public profileForm:FormGroup
 
  public inputFocused:{[key:string]:boolean} = {

  }
  
  public inputs = {
    firstName:[''],
    lastName:[''],
    email:[''],
    phonenumber:[''],
    
   }
  public photo = ''
  public u:User

  public changedProfilePict=false
  constructor(private modalController: ModalController,public fb:FormBuilder,public profileService:ProfileService,public toastController:ToastController,public router:Router,public authservice:AuthService) { 
  
    Object.keys(this.inputs).forEach(k=>{
      this.inputFocused[k] = false
    })    
    this.profileForm = this.fb.group(this.inputs)

  }
  public submitForm(){
    console.log('submitted')
  }
  ionViewDidEnter() {
    this.authservice.profileCallback().subscribe(u=>{
      if(u){
        this.u = u.data
      }
      //@ts-ignore
      this.photo = u.data?.profilePicture

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
  public updateProfile(){
    let formdata = new FormData()
    //formdata.append('ala','romdhani')
    Object.keys(this.profileForm.controls).filter(k=>{
      return this.profileForm.controls[k].value!=''
    }).forEach(k=>{
      
      formdata.append(k,this.profileForm.controls[k].value)
    })

      if(this.photo && this.photo.startsWith('blob')){
        fetch(this.photo).then(res=>{
          return res.blob()
        }).then(blobData=>{
          const memeType = blobData.type
          //@ts-ignore
          formdata.append('pp',blobData,'file'+mimeToExtension[memeType]?'jpg':'')
          this.profileService.updateProfile(formdata).subscribe(data=>{
            SuccessHandlor(this.toastController,data.message)
            this.router.navigate(['/folder/me'])
          },err=>{
           HandlerError(this.toastController,err)
          })
        })
        
      }
      else{
        this.profileService.updateProfile(formdata).subscribe(data=>{
          SuccessHandlor(this.toastController,data.message)
          this.router.navigate(['/folder/me'])
        },err=>{
         HandlerError(this.toastController,err)
        })
      }
      
  }
  public discardPicture(){
   
    this.changedProfilePict = false
    this.photo = this.u.profilePicture
  }
  public change(){
    if(this.changedProfilePict){
      this.discardPicture()
    }
    else{
      this.openOptionSelection()
 
    }
  }
  

}
