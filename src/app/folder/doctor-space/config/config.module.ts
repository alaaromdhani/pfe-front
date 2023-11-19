import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FieldsComponent } from './fields/fields.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFieldComponent } from './fields/add-field/add-field.component';

const routes:Routes = [{
  path:'fields',
  component:FieldsComponent
}]

@NgModule({
  declarations: [FieldsComponent,AddFieldComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ConfigModule { }
