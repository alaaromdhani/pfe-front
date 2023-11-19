import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/types';
import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppoitmentsComponent } from './appoitments/appoitments.component';
import { TestComponent } from './test/test.component';
import { ProfileUpdaterComponent } from './profile-updater/profile-updater.component';
import { ProfilePhotoOptionComponent } from './profile-updater/profile-photo-option/profile-photo-option.component';
import { SharedModule } from '../shared/shared.module';
import { AppoitmentDetailsComponent } from './test/appoitment-details/appoitment-details.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { AccountVerifiedComponent } from './account-verified/account-verified.component';
@NgModule({
  imports: [
   
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgApexchartsModule,
    DragDropModule,
    ReactiveFormsModule,
    
    

    
    
  
  ],
  declarations: [DashboardComponent,ProfileComponent,AppoitmentsComponent,TestComponent,ProfileUpdaterComponent,ProfilePhotoOptionComponent,AppoitmentDetailsComponent,VerifyAccountComponent,AccountVerifiedComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FolderPageModule {}
