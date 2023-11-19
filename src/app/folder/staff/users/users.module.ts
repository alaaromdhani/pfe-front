import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReadUsersComponent } from './read-users/read-users.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable'
import { SharedModule } from 'src/app/shared/shared.module';
const routes:Routes=[
  {
    path:'add-users',
    component:AddUserComponent
  },
  {
    path:'update-users/:id',
    component:AddUserComponent
  },
  {
    path:'read-users',
    component:ReadUsersComponent
  }
]
@NgModule({
  declarations: [AddUserComponent,ReadUsersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    SharedModule
    
    
    
    
  
  ]
})
export class UsersModule { }
