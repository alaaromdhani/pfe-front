import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from '../shared/input/input.component';

const routes:Routes=[{
  path:'login',
  component:LoginComponent
},{
  path:'register',
  component:RegisterComponent
}]

@NgModule({
  declarations: [RegisterComponent,LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule
    
    
  ]
})
export class AuthenticationModule { }
