import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import * as L from "leaflet";
import { Geolocation } from '@capacitor/geolocation';
import { SuccessHandlor } from 'src/utils/ResultHandlor';
import { Mission } from 'src/app/models/Mission';
@Component({
  selector: 'app-track-mission',
  templateUrl: './track-mission.component.html',
  styleUrls: ['./track-mission.component.scss'],
})
export class TrackMissionComponent  implements OnInit {
  public mission:Mission
  public map:L.Map
  public currentLocation:{longitude:number,latitude:number}
  
  constructor(public modalController:ModalController,public toast:ToastController) { }
  public closeModal(){
    this.modalController.dismiss(null,'dropdown')
  }
  async ngOnInit() {
    let {latitude,longitude} = await (await Geolocation.getCurrentPosition()).coords
    this.currentLocation = {latitude,longitude}
    
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
        var latlngs:L.LatLngExpression[] = [
          [latitude, longitude],
          [parseFloat(this.mission.lat),parseFloat(this.mission.lang)],
          
      ];  
      var polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);

      // zoom the map to the polyline
      this.map.fitBounds(polyline.getBounds());
    },1000)
    


  }
  public chooseLocation(event:any){
    console.log(Object.keys(event))
  }


}
