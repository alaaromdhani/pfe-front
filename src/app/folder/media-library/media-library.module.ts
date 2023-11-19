import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddUploadComponent } from './add-upload/add-upload.component';
import { ReadUploadComponent } from './read-upload/read-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[

  {
    path:'add-uploads',
    component:AddUploadComponent
  },
  {
    path:'read-uploads',
    component:ReadUploadComponent
  }
]

@NgModule({
  declarations: [AddUploadComponent,ReadUploadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MediaLibraryModule { }
