import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { StaffService } from 'src/app/services/staff.service';
import { HandlerError } from 'src/utils/ResultHandlor';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-chat-patient',
  templateUrl: './chat-patient.component.html',
  styleUrls: ['./chat-patient.component.scss'],
})
export class ChatPatientComponent  implements OnInit {
  public doctors:User[] = []
  constructor(public staffService:StaffService,public toastController:ToastController,public router:Router,public modal:ModalController) { }
  public getDoctors(){
      this.staffService.getUsersForChat().subscribe(data=>{
        this.doctors = data.data
      })

  }
  ngOnInit() {
    this.getDoctors()
  }
  public createRoom(id:number){
      
      let userIds = [id]
      this.staffService.createRoom(userIds).subscribe(async (room)=>{
          this.staffService.getCurrentUser().subscribe(async data=>{
            let modal = await this.modal.create({
              component:ChatComponent,
              componentProps:{
                roomId:room.id,
                user_id:data.data.id
              }
            })
            modal.onDidDismiss().then(data=>{
              console.log('ala')
            })
            return await modal.present()
          })
      })
  }



}
