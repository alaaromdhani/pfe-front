import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';



@NgModule({
  declarations: [SearchInputComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[SearchInputComponent]
})
export class SharedModule { }
