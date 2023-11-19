import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SetPermissionsComponent } from './set-permissions/set-permissions.component';
import { StaffService } from 'src/app/services/staff.service';
import { Role } from 'src/app/models/Role';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-read-role',
  templateUrl: './read-role.component.html',
  styleUrls: ['./read-role.component.scss'],
})
export class ReadRoleComponent  implements OnInit {
  public roles:Role[]
  public currentUser:User
  constructor(public modalController:ModalController,public staffService:StaffService,public toastController:ToastController,public authService:AuthService,public configService:ConfigService) { }
  public permissions:{[key:string]:string[]}

  public getPermissions(){
    this.configService.getPermissions(['role']).subscribe(data=>{
      this.permissions = data.data
    },err=>{
      
    })
  }
  ngOnInit() {
    this.getPermissions()
    this.authService.profileCallback().subscribe(data=>{
      this.currentUser = data.data

    })
    this.getRoles()
   
  }
  public getRoles(){
    this.staffService.getRoles().subscribe(data=>{
    
      this.roles = data.data.data

    },err=>{
      console.log(err)

    })
  }
  public async updateRole(id:number){
    try{
    let role:Role
    
      role = await new Promise((resolve,reject)=>{
        this.staffService.findOneRole(id).subscribe(data=>{
          return resolve(data.data)
        },err=>{
          return reject(err)
        })

    })
    
      
    const modal = await this.modalController.create({
      component:SetPermissionsComponent,
      cssClass: 'transparent-modal',
      componentProps:{
        role,
        user:this.currentUser,
        add:false
      }

    })
    modal.onDidDismiss().then(res=>{
      if(res.data){
        this.getRoles()
      }
    })
    return await modal.present();
    }catch(e){
      console.log(e)
      HandlerError(this.toastController,e)  
    }
  }
  public async createRole(){
    try{
        
      const modal = await this.modalController.create({
        component:SetPermissionsComponent,
        cssClass: 'transparent-modal',
        componentProps:{
          role:{name:'',weight:'',Permissions:[]},
          user:this.currentUser,
          add:true
        }
  
      })
        modal.onDidDismiss().then(res=>{
          if(res.data){
            this.getRoles()
          }
        })
      return await modal.present();
      }catch(e){
        console.log(e)
        HandlerError(this.toastController,e)  
      }
    }
    public deleteRole(id:number){
      this.staffService.deleteRole(id).subscribe(data=>{
        SuccessHandlor(this.toastController,data.message)
        this.getRoles()
      },err=>{
          HandlerError(this.toastController,err)
      })
    } 
  

}
