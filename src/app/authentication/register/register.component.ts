import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  public loginForm:FormGroup
  public inputFocused:{[key:string]:boolean} = {

  }
  public inputs = {
    username:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required],
    phonenumber:['',Validators.required],
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    
      
  }
  constructor(public fb:FormBuilder,public authservice:AuthService,public toastController:ToastController) {
    Object.keys(this.inputs).forEach(k=>{
      this.inputFocused[k] = false
    })    
    this.loginForm = this.fb.group(this.inputs)

   }

  ngOnInit() {

  }
  public onFocus(key:string){
    this.inputFocused[key] = true
  }
  public onBlur(key:string){
    this.inputFocused[key] = false
  }
  public signUp(){
    let user:any ={}
    Object.keys(this.loginForm.controls).filter(k=>{
      return this.loginForm.controls[k].value!=''
    }).forEach(k=>{
      user[k]= this.loginForm.controls[k].value
    
    })
    user.country_id=222
    user.state_id=1
    this.authservice.register(user).subscribe((data)=>{
      SuccessHandlor(this.toastController,data.message)
      document.location.reload()
    },err=>{
      HandlerError(this.toastController,err)

    })

    
    
    //do what you want
  }

}
