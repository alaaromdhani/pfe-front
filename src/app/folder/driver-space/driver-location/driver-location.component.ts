import { Component, OnInit } from '@angular/core';

import * as L from "leaflet";
@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.component.html',
  styleUrls: ['./driver-location.component.scss'],
})
export class DriverLocationComponent  implements OnInit {
  public map:L.Map
  constructor() { }

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
       
    
    },1000)
    let icon = L.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#c30b82;height:30px;width:30px;padding:4px; align-items: center; justify-content: center;border-radius: 50% 50% 50% 0;transform: rotate(-45deg);'><div style=' align-items: center;display: flex;justify-content: center;color: #FFFFFF;transform: rotate(45deg);'><img style='height:20px;border-radius: 50%;'  src='assets/images/ala.jpg' alt=''></div></div> ",
      iconSize: [30, 42],
      iconAnchor: [15, 42]
   });
    const marker = L.marker([33.892166, 9.561555],{icon});
      setTimeout(()=>{
        marker.addTo(this.map);

      },2000)

  }

}
