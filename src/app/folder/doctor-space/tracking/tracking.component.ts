import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent  implements OnInit {
 private map:L.Map;
public isSearchInputHidden =true
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
  }
  constructor() { }

  ngOnInit() {
    this.showMap()
  }
  showMap(){
    setTimeout(() =>{
      //@ts-ignore
      L.Control.MyControl = L.Control.extend({
        
        onAdd: function(map:any) {
          let divElement = L.DomUtil.create('div')
          
          divElement.style.display = 'flex'
          //@ts-ignore
          divElement.style['align-items'] = 'flex'
          divElement.style.gap = '0.5em'
          let loopLogo = document.createElement('ion-icon')
          /*background-color: #2f2f2f;
          border: none;
          color: rgba(#efefef, .5);
          font-size: 12pt;
          font-weight: 100;
          margin-right: 10px;
          padding: .25em .75em;
          float: right;
          max-width: 130px;*/
          
          loopLogo.style.fontSize = '2em'
          loopLogo.setAttribute('name','search-outline')
          
          let inputElement = document.createElement('input')
          inputElement.setAttribute('type','text') 
          inputElement.style.borderRadius = '28px'
          inputElement.style.border = 'none'
       
          inputElement.style.visibility='hidden'  
          inputElement.style.width = '0px'
          inputElement.style.transition= 'width 0.6s ease';
          
          divElement.appendChild(inputElement)
          divElement.appendChild(loopLogo)

          loopLogo.addEventListener('click',e=>{
            if(inputElement.style.visibility=='hidden'){
              inputElement.style.width = '300px'
              inputElement.style.visibility = 'visible'
             }
             else if(inputElement.style.visibility=='visible'){
              inputElement.style.width = '0px'
              setTimeout(()=>{
                inputElement.style.visibility = 'hidden'
              },600)
            }
          })
         // var el = L.DomUtil.create('ion-icon');

          
          /*el.setAttribute("name","search-outline")
          el.addEventListener('click',e=>{
            console.log('seaching.....')

          })*/
          return divElement;
        },
      
        onRemove: function(map:any) {
          // Nothing to do here
        }
      });
      //@ts-ignore
      L.control.myControl = function(opts) {
     //@ts-ignore
        return new L.Control.MyControl(opts);
      }
      //@ts-ignore
     
      
      this.map = new L.Map('map', {
        center: [33.892166, 9.561555],
        zoom: 10,
        renderer: L.canvas()
      })
      
     
     
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '£copy: <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap</a>'
      }).addTo(this.map)
       //@ts-ignore 
      L.control.myControl({
        position: 'topright'
      }).addTo(this.map);
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
      
      this.map.invalidateSize();
      let iconElement = document.querySelector('.leaflet-marker-icon') as HTMLElement
      if(iconElement){
        console.log(iconElement)
       
      }
      
      // this.map.on("click", <LeafletMouseEvent>(event) => {
      //   // get the coordinates
      //   console.log(event.latlng)
      //   this.newMarker = L.marker(event.latlng, {draggable : true}).addTo(this.map);
      // });

    },1500)
  }
}
