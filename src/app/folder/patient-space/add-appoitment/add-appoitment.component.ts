import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AppoitmentService } from 'src/app/services/appoitment.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-add-appoitment',
  templateUrl: './add-appoitment.component.html',
  styleUrls: ['./add-appoitment.component.scss'],
})
export class AddAppoitmentComponent  implements OnInit {
  public appoitmentForm:FormGroup
  public inputs = {} 
  public inputFocused:{[key:string]:boolean} = {

  }
  constructor(public appoitmentService:AppoitmentService,public toast:ToastController,public modal:ModalController,public fb:FormBuilder) { 
    this.inputs = {
      message:['',Validators.required],
    }
    Object.keys(this.inputs).forEach(k=>{
      //@ts-ignore
      this.inputFocused[k] = false
    })    
    this.appoitmentForm = this.fb.group(this.inputs)
  }
  public submitForm(){
    this.addAppoitement()
  }
  public addAppoitement(){
    let appoitment={}
    Object.keys(this.appoitmentForm.controls).filter(k=>{
      return this.appoitmentForm.controls[k].value!=''
    }).forEach(k=>{
        //@ts-ignore
        appoitment[k] = this.appoitmentForm.controls[k].value

    })
    this.appoitmentService.addAppoitments(appoitment).subscribe(data=>{
      SuccessHandlor(this.toast,data.message)
      this.modal.dismiss(data,'dropdown')
    },err=>{
      HandlerError(this.toast,err)
    })
  }
  ngOnInit() {}


}
