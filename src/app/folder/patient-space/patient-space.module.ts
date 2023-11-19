import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAppoitmentComponent } from './add-appoitment/add-appoitment.component';
import { ReadAppoitmentsComponent } from './read-appoitments/read-appoitments.component';
import { RouterModule, Routes } from '@angular/router';
import { DoctorPickerComponent } from './read-appoitments/doctor-picker/doctor-picker.component';
import { ChatPatientComponent } from './chat-patient/chat-patient.component';
import { ChatDoctorComponent } from '../doctor-space/chat-doctor/chat-doctor.component';
import { ChatComponent } from './chat-patient/chat/chat.component';

const routes:Routes=[{
  path:'read-appoitments',
  component:ReadAppoitmentsComponent

},{
  path:'chat',
  component:ChatPatientComponent
}]

@NgModule({
  declarations: [AddAppoitmentComponent,ReadAppoitmentsComponent,DoctorPickerComponent,ChatPatientComponent,ChatComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientSpaceModule { }
