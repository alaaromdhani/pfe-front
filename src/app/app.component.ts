import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ResponseData } from './models/Data';
import { User } from './models/User';
import { ToastController } from '@ionic/angular';
import { HandlerError, SuccessHandlor } from 'src/utils/ResultHandlor';
import { Subscription, interval, takeUntil } from 'rxjs';
import { DriverService } from './services/driver.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public subsciption = new Subscription()
  
  public user:User
  public  menuItems:any[] =[
  ];
  public elementsConfig:{[key:string]:boolean} = {

  }
  public children:{[key:string]:object[]} = {}
  public async stayConnected(){
      if(this.user&&this.user.Role){
        if(this.user.Role.name==='Driver'){
          let {latitude,longitude} = (await Geolocation.getCurrentPosition()).coords
      
          this.driverService.updateLocation({lat:latitude,lang:longitude}).subscribe(data=>{
            
          })
        }
        
      }

  }
  ngOnInit(): void {
   /* */
   this.subsciption =  interval(8000).subscribe(()=>{
    this.stayConnected()
  })
    this.authService.profileCallback().subscribe(u=>{
      this.user = u.data
      

    },err=>{
      console.log(err)
    })
    this.authService.getMenu().subscribe(data=>{
      this.menuItems = data.data.menu
      this.getElements()
   })
  
  }
  public getElements(){
  
    this.menuItems.forEach(mi=>{
      if(mi.hasSubChildren){
        this.elementsConfig[mi.title] = false
        this.children[mi.title] = this.menuItems.filter(m=>m.parent&& m.parent===mi.title)
      }
    })
  }
  constructor(public authService:AuthService,public toast:ToastController,public driverService:DriverService) {}
  public closeSubMenu(title:string){
    this.updateHeight(title,'0px')
    setTimeout(()=>{
      this.elementsConfig[title]=false
    },100)
  }
  public openSubMenu(title:string){
    let childHeight = this.children[title].length*65
    this.updateHeight(title,childHeight+'px')
    setTimeout(()=>{
      this.elementsConfig[title]=true
    },100)
    Object.keys(this.elementsConfig).filter(k=>this.elementsConfig[k]&&k!=title).forEach(t=>{
      this.closeSubMenu(t)
    })
  }
  public updateHeight(id:string,height:string){
    const list  = document.querySelector("#"+id) as HTMLElement
   
    if(list){
        list.style.height = height
      }
  }
  public onClick(id:string){

    if(this.elementsConfig[id]===true){
      this.closeSubMenu(id)
    }
    else{
     this.openSubMenu(id)
    }
  }
  public logout(){
    this.authService.logout().subscribe(data=>{
          SuccessHandlor(this.toast,'logged out successfully')      
          document.location.reload()
    },err=>{
      HandlerError(this.toast,err)
    })

  }
  /*public navigate(url:string){
    this.router.
  }*/
}
