import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Field } from 'src/app/models/Field';
import { ConfigService } from 'src/app/services/config.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss'],
})
export class AddFieldComponent  implements OnInit {
  public add:boolean
  public f:Field
  public value:string=""
  public fieldForm:FormGroup
  public photo:string = ""
  public inputFocused:{[key:string]:boolean} = {

  }
 
  public  closeModal(){
    this.modalController.dismiss()

  }
  public inputs = {}
  constructor(public fb:FormBuilder,public modalController:ModalController,public toast:ToastController,public configService:ConfigService) {
  }
  ngOnInit() {
    this.initializeForm()
  }
  public initializeForm(){
      if(this.add){
        this.inputs = {
          name:['',Validators.required],
          color:['',Validators.required],
          short_description:['',Validators.required]
        }
      }
      else{
        this.inputs = {
          name:[this.f.name,Validators.required],
          color:[this.f.color,Validators.required],
          short_description:[this.f.short_description,Validators.required]
        }
      }
     Object.keys(this.inputs).forEach(k=>{
      //@ts-ignore
      this.inputs[k][0]===''?this.inputFocused[k] = false:true
    })    
    this.fieldForm = this.fb.group(this.inputs)
  
  }
  public submitForm(){
    if(!this.add && this.f){
      this.updateField(this.f.id)
      
    }else{
      this.addField()
    }
  }
  public addField(){
    let field={}
    Object.keys(this.fieldForm.controls).filter(k=>{
      return this.fieldForm.controls[k].value!=''
    }).forEach(k=>{
        //@ts-ignore
        field[k] = this.fieldForm.controls[k].value

    })
    this.configService.addField(field).subscribe(data=>{
      
      SuccessHandlor(this.toast,data.message)
      this.modalController.dismiss(data,'')
    },err=>{
      HandlerError(this.toast,err)
    })  

  }
  public updateField(id:number){
    let field={}
    Object.keys(this.fieldForm.controls).filter(k=>{
      return this.fieldForm.controls[k].value!=''
    }).forEach(k=>{
        //@ts-ignore
        field[k] = this.fieldForm.controls[k].value
    })
    this.configService.updateField(id,field).subscribe(data=>{
      SuccessHandlor(this.toast,data.message)
      this.modalController.dismiss(data,'')
    },err=>{
      HandlerError(this.toast,err)
    })  

  }

}
