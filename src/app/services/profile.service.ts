import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseLink } from 'src/utils/constants';
import { ResponseData } from '../models/Data';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  public updateProfile(formdata:FormData){
    return this.http.patch<ResponseData<User>>(baseLink+'/profile',formdata,{
      withCredentials:true
    })

  }
  constructor(public http:HttpClient) { }
}
