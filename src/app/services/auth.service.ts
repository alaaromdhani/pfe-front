import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseLink } from 'src/utils/constants';
import {  ResponseData } from '../models/Data';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject = new BehaviorSubject<User|null>(null)
  public userObservable = this.userSubject.asObservable()
  public login(credentials:{identifier:string,password:string}){
    return this.http.post(baseLink+'/auth/local',credentials,{
      withCredentials:true
    })
  } 

  public register(user:any){
    return this.http.post<ResponseData<{message:string}>>(baseLink+'/auth/local/register',user,{
      withCredentials:true
    })
  }
  public resendNotification(){
    return this.http.get<ResponseData<any>>(baseLink+'/front/api/v1/resend/account_activation',{withCredentials:true})
  }
  public activateAccount(data:{validationCode:string}){
    return this.http.post<ResponseData<any>>(baseLink+'/front/api/v1/activate_account',data,{withCredentials:true})
  }
///front/api/v1/activate_account
  public profileCallback(){
    return this.http.get<ResponseData<User>>(baseLink+'/profile/me',{
      withCredentials:true
    })
  }
  public async checkConnected(){
    return new Promise((resolve,reject)=>{
        this.profileCallback().subscribe(data=>{
            this.userSubject.next(data.data)
            return resolve(data.data)
        },err=>{
            return reject(err.status)
        })

    })

  }
  public getMenu(){
   return  this.http.get<ResponseData<{menu:any[]}>>(baseLink+'/menu',{
      withCredentials:true
    })

  }
  public logout(){
   return  this.http.get<ResponseData<any>>(baseLink+'/logout',{
    withCredentials:true
   })
  }
  public stayConnected(){
    return this.http.get<ResponseData<any>>(baseLink+'/api/v1/connection',{
      withCredentials:true
    })
   }
  constructor(public http:HttpClient) { 
      
  }
}
