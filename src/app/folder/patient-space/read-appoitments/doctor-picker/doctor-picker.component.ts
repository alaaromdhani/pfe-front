import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Handler } from 'leaflet';
import { User } from 'src/app/models/User';
import { AppoitmentService } from 'src/app/services/appoitment.service';
import { StaffService } from 'src/app/services/staff.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-doctor-picker',
  templateUrl: './doctor-picker.component.html',
  styleUrls: ['./doctor-picker.component.scss'],
})
export class DoctorPickerComponent  implements OnInit {
  public id:number
  public doctors:User[]=[]
  constructor(public modalController:ModalController,public staffService:StaffService,public toastController:ToastController,public appoitmentService:AppoitmentService) { 

  }
  public closeModal(){
    this.modalController.dismiss()
  }
  ngOnInit() {
    this.staffService.findByRole('Doctor').subscribe(data=>{
      this.doctors = data.data
    },err=>{
       HandlerError(this.toastController,err) 

    })


  }
  public pickADoctor(id:number){
    this.appoitmentService.updateAppoitments(this.id,{
      assigned_to:id
    }).subscribe(data=>{
      SuccessHandlor(this.toastController,data.message)
      this.modalController.dismiss(data,'doc')
    },err=>{
      HandlerError(this.toastController,err)

    })

  }

}
