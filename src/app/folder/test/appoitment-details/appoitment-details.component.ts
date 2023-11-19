import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-appoitment-details',
  templateUrl: './appoitment-details.component.html',
  styleUrls: ['./appoitment-details.component.scss'],
})
export class AppoitmentDetailsComponent  implements OnInit {
  public closeModal(){
    this.modalController.dismiss(null,'dropdown')

  }
  constructor(public modalController:ModalController) { }

  ngOnInit() {}

}
