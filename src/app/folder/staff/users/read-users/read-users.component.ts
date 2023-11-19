import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { ConfigService } from 'src/app/services/config.service';
import { StaffService } from 'src/app/services/staff.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-read-users',
  templateUrl: './read-users.component.html',
  styleUrls: ['./read-users.component.scss'],
})
export class ReadUsersComponent  {
    public users:User[]
   public open(){
    
  }
  public permissions:{[key:string]:string[]}

  public getPermissions(){
    this.configService.getPermissions(['user']).subscribe(data=>{
      this.permissions = data.data
    },err=>{
      
    })
  }
  constructor(public router:Router,public staffService:StaffService,public toastController:ToastController,public configService:ConfigService) { }
  addUser(){
    this.router.navigate(['/folder/staff/users/add-users'])
  }
  public search(e:any){
    this.staffService.searchUser(e).subscribe(data=>{
      this.users = data.data.data
    },err=>{
      HandlerError(this.toastController,err)

    })
  }
  ionViewDidEnter() {
    this.getUsers()
  }
  public getUsers(){
    this.getPermissions()
    this.staffService.getUsers().subscribe(data=>{
      this.users = data.data.data

  },err=>{
    HandlerError(this.toastController,err)
  })
  }
  public updateUser(id:number){
    this.router.navigate(['/folder/staff/users/update-users/'+id])
  }
  public deleteUser(id:number){
    this.staffService.deleteUser(id).subscribe(data=>{
    SuccessHandlor(this.toastController,data.message)
    this.getUsers()
    },err=>{
      HandlerError(this.toastController,err)
  })
  }

  

}
