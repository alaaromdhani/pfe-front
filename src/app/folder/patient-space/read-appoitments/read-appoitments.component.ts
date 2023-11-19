import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddAppoitmentComponent } from '../add-appoitment/add-appoitment.component';
import { AppoitmentService } from 'src/app/services/appoitment.service';
import { Appoitment } from 'src/app/models/Appoitment';
import { DoctorPickerComponent } from './doctor-picker/doctor-picker.component';

@Component({
  selector: 'app-read-appoitments',
  templateUrl: './read-appoitments.component.html',
  styleUrls: ['./read-appoitments.component.scss'],
})
export class ReadAppoitmentsComponent  implements OnInit {
  public appoitments:Appoitment[]=[]
  constructor(public modalController:ModalController,public appoitmentService:AppoitmentService) { }
  public getAppoitments(){
    this.appoitmentService.getAppoitments().subscribe(data=>{

      this.appoitments = data.data.data
      console.log(this.appoitments)
    })

  }
  ngOnInit() {
    this.getAppoitments()
  }
  public async assignToDoctor(id:number){
    let modal = await  this.modalController.create({
      component:DoctorPickerComponent,
      componentProps:{
        id:id
      }

    })
    modal.onDidDismiss().then(res=>{
      if(res.data){
        this.getAppoitments()

      }
    })
    return await modal.present()
  }
  deleteAppoitment(id:number){


  }
  public async addAppoitment(){
    let modal = await this.modalController.create({
      component:AddAppoitmentComponent
    })
    modal.onDidDismiss().then(res=>{
      if(res.data){
        this.getAppoitments()  
      }
     
    })
    return await modal.present()
  }
}
