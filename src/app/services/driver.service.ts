import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData, ResponseDataPagination } from '../models/Data';
import {Mission} from '../models/Mission'
import { baseLink } from 'src/utils/constants';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor( public http:HttpClient) { }
  public updateLocation(newLocation:any){
    return this.http.put<ResponseData<any>>(baseLink+'/api/v1/update_location',newLocation,{
      withCredentials:true
    })
  }
  public getDriversLocation(){
    return this.http.get<ResponseData<{id:number,lastName:string,firstName:string,profilePicture:string,lat:number,lang:number}[]>>(baseLink+'/api/v1/drivers_locations',{
      withCredentials:true
    })
  }
  public getMissions(){
    return this.http.get<ResponseDataPagination<Mission>>(baseLink+'/api/v1/missions',{
      withCredentials:true
    })
  }
  public addMission(mission:any){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/missions',mission,{
      withCredentials:true
    })
  }
  public updateMission(id:number,mission:any){
    return this.http.patch<ResponseData<any>>(baseLink+'/api/v1/missions/'+id,mission,{
      withCredentials:true
    })
  }
  public findOneMission(id:number){
   return  this.http.get<ResponseData<Mission>>(baseLink+'/api/v1/missions/'+id,{
      withCredentials:true
    })
  }
  public findDrivers(){
    return this.http.get<ResponseData<User[]>>(baseLink+`/api/v1/users/find/Driver`,{
      withCredentials:true
    })
  }
  public deleteMission(id:number){
    return this.http.delete<ResponseData<any>>(baseLink+`/api/v1/missions/${id}`,{
      withCredentials:true
    })
  }

}
