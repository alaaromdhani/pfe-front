import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import * as L from "leaflet";
import { SuccessHandlor } from 'src/utils/ResultHandlor';
@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.scss'],
})
export class ChooseLocationComponent  implements OnInit {
  public map:L.Map
  
  constructor(public modalController:ModalController,public toast:ToastController) { }
  public closeModal(){
    this.modalController.dismiss(null,'dropdown')
  }
  ngOnInit() {
    setTimeout(()=>{
      console.log('showing the map')
      this.map = new L.Map('map', {
        center: [33.892166, 9.561555],
        zoom: 10,
        renderer: L.canvas()
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '£copy: <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a>'
      }).addTo(this.map)
      this.map.invalidateSize();
      this.map.addEventListener('click',(e)=>{
        SuccessHandlor(this.toast,'position choosen successfully')
        this.modalController.dismiss(e.latlng)
       
      })   
    
    },1000)
    


  }
  public chooseLocation(event:any){
    console.log(Object.keys(event))
  }

}
