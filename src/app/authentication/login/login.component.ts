import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  public formGroup:FormGroup
  constructor(public auth:AuthService,public toastController: ToastController,public fb:FormBuilder) {
    this.formGroup = this.fb.group({
      identifier:['',Validators.required],
      password:['',Validators.required]
    })
   }
  
  ngOnInit() {
        
  }
  public login(){
    if(this.formGroup.valid){
      this.auth.login({identifier:this.formGroup.controls['identifier'].value,password:this.formGroup.controls['password'].value}).subscribe(data=>{
        SuccessHandlor(this.toastController,'login successfull')
        document.location.reload()
  
      },err=>{
        console.log(err)
          HandlerError(this.toastController,err)
      })
      
    }
    
  }
  public testInputError(input:string){
    return this.formGroup.get(input)?.hasError('required') && ((this.formGroup.get(input)?.dirty || this.formGroup.get(input)?.touched))
  }

}
