import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotauthGuard implements CanActivate {
  constructor(public authService:AuthService,public router:Router){
  

  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      try{
        let user = await this.authService.checkConnected()  
          //@ts-ignore
          if(user.active){
            this.router.navigate(['/folder/me'])
          }
          else{
            this.router.navigate(['/folder/verify-account'])
          }
          
          return Promise.resolve(false)
        }catch(e){
          
          if(e!==403){
            this.router.navigate(['/']) 
          }
         
          return Promise.resolve(true)
        }  
    
  }
  
}
