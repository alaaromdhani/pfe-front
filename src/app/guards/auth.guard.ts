import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public constructor(public authService:AuthService,public route:Router){
    
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      try{

          let u= await this.authService.checkConnected()  
            //@ts-ignore
          if(u.active){
            return Promise.resolve(true)
          }
          else{
            this.route.navigate(['/folder/verify-account'])
            return Promise.resolve(false)
            
            
          }
        }catch(e){
          
          if(e===403){
            this.route.navigate(['/auth/login'])
          }
          else{
            this.route.navigate(['/'])
          }
          return Promise.resolve(false)
        }  
    
  }
  
}
