import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentDidLoad } from '@ionic/pwa-elements/dist/types/stencil-public-runtime';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public user:User
  public loaded=false
  constructor(public router:Router,public authService:AuthService) { }
  public updateProfile(){
    
    this.router.navigate(['/folder/update-profile'])
  }

  ionViewDidEnter() { 
    

    this.authService.profileCallback().subscribe(data=>{
      if(data){
        
        this.user = data.data
        
        //       console.log(this.user.firstName)
      }
      
    })
 
   }
  
   

}
