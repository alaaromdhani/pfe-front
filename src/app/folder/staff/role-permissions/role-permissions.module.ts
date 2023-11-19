import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleComponent } from './add-role/add-role.component';
import { ReadRoleComponent } from './read-role/read-role.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetPermissionsComponent } from './read-role/set-permissions/set-permissions.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {path:'add-roles',component:AddRoleComponent},
  
  {path:'read-roles',component:ReadRoleComponent}
]

@NgModule({
  declarations: [AddRoleComponent,ReadRoleComponent,SetPermissionsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RolePermissionsModule { }
