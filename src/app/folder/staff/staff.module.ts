import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
{
  path:'users',
  loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule)
 
},
{
  path:'roles-permissions',
  loadChildren:()=>import('./role-permissions/role-permissions.module').then(m=>m.RolePermissionsModule)
}

]

@NgModule({
  declarations: [RolePermissionsComponent,UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
  
  ]
})
export class StaffModule { }
