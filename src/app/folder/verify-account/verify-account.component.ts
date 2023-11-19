import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent  implements OnInit {
  public verifyCodeForm:FormGroup
  public inputFocused:{[key:string]:boolean} = {

  }
  public inputs = {
    code:['',Validators.required],
  }
  constructor(public fb:FormBuilder,public authservice:AuthService,public toastController:ToastController,public router:Router) {
    Object.keys(this.inputs).forEach(k=>{
      this.inputFocused[k] = false
    })    
    this.verifyCodeForm = this.fb.group(this.inputs)

   }

  ngOnInit() {

  }
  public onFocus(key:string){
    this.inputFocused[key] = true
  }
  public onBlur(key:string){
    this.inputFocused[key] = false
  }
  public verifyAccount(){
    const code = this.verifyCodeForm.controls['code'].value
    this.authservice.activateAccount({validationCode:code}).subscribe(data=>{
        SuccessHandlor(this.toastController,data.message)
        this.router.navigate(['/folder/account-verified'])        
    },err=>{
      HandlerError(this.toastController,err)

    })    
    //do what you want
  }
  public resendNotification(){
    this.authservice.resendNotification().subscribe(data=>{
      SuccessHandlor(this.toastController,data.message)
  },err=>{
    HandlerError(this.toastController,err)
  })    
  }


}
