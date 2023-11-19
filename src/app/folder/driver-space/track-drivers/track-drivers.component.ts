import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { Subscription, interval } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';
@Component({
  selector: 'app-track-drivers',
  templateUrl: './track-drivers.component.html',
  styleUrls: ['./track-drivers.component.scss'],
})
export class TrackDriversComponent  implements OnInit {
  public currentMarkers:{id:number,profilePicture:string,lastName:string,firstName:string,marker:L.Marker}[]=[]

  public map:L.Map
  public subscribtion = new Subscription()
  constructor(public driverService:DriverService) { }
  public trackDrivers(){
    this.driverService.getDriversLocation().subscribe(data=>{
      let existingIds = this.currentMarkers.map(u=>u.id)
      let retrievedIds = data.data.map(u=>u.id)
      if(existingIds.sort().join('')!==retrievedIds.sort().join('')){
        this.currentMarkers.forEach(m=>{

          this.map.removeLayer(m.marker)

        })
        this.currentMarkers=[]
        data.data.forEach(element => {
          this.addDriverInPosition(element)        
        });
      }
      
      
    })

  }
  public addDriverInPosition(driver:any){
    console.log(driver)
    let icon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style='background-color:#c30b82;height:30px;width:30px;padding:4px; align-items: center; justify-content: center;border-radius: 50% 50% 50% 0;transform: rotate(-45deg);'><div style=' align-items: center;display: flex;justify-content: center;color: #FFFFFF;transform: rotate(45deg);'><img style='height:20px;border-radius: 50%;'  src='${driver.profilePicture}' alt=''></div></div> `,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
   });
    
   const marker = L.marker([driver.lat,driver.lang],{icon});
      setTimeout(()=>{
        marker.addTo(this.map);

      },1000)
      driver.marker = marker
      this.currentMarkers.push(driver)

  }
  ngOnInit() {
    
    this.subscribtion =  interval(8000).subscribe(()=>{
      this.trackDrivers()
    })
    setTimeout(()=>{
      this.map = new L.Map('map', {
        center: [33.892166, 9.561555],
        zoom: 10,
        renderer: L.canvas()
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '£copy: <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a>'
      }).addTo(this.map)
      this.map.invalidateSize();
     // this.addDriverInPosition()       
    
    },1000)

  }


}
