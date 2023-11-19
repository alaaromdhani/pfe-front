import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonGuard implements CanActivate {
  public constructor(public authService:AuthService,public route:Router){
    
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      try{

          let u= await this.authService.checkConnected()  
            //@ts-ignore
          return Promise.resolve(true)
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
