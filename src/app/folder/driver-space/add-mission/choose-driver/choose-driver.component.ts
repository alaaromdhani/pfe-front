import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { AppoitmentService } from 'src/app/services/appoitment.service';
import { StaffService } from 'src/app/services/staff.service';
import { HandlerError } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-choose-driver',
  templateUrl: './choose-driver.component.html',
  styleUrls: ['./choose-driver.component.scss'],
})
export class ChooseDriverComponent  implements OnInit {
  public drivers:User[]=[]
  constructor(public modalController:ModalController,public staffService:StaffService,public toastController:ToastController,public appoitmentService:AppoitmentService) { 

  }
  public closeModal(){
    this.modalController.dismiss(null,'dropdown')
  }
  ngOnInit() {
    this.staffService.findByRole('Driver').subscribe(data=>{
      this.drivers = data.data
    },err=>{
       HandlerError(this.toastController,err) 
  
    })
  
  
  }
  public pickDriver(id:number){
      let driver = this.drivers.filter(i=>i.id===id)[0]
      this.modalController.dismiss(driver,'dropdown')
  }
  

}
