import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData, ResponseDataPagination } from '../models/Data';
import { Appoitment } from '../models/Appoitment';
import { baseLink } from 'src/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AppoitmentService {

  constructor(public http:HttpClient) {

  }
  public getAppoitments(){
    return this.http.get<ResponseDataPagination<Appoitment>>(baseLink+'/api/v1/appoitments',{
      withCredentials:true
    })
  }
  public addAppoitments(appoitment:any){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/appoitments',appoitment,{
      withCredentials:true
    })
  }
  public updateAppoitments(id:number,appoitment:any){
    return this.http.patch<ResponseData<any>>(baseLink+'/api/v1/appoitments/'+id,appoitment,{
      withCredentials:true
    })
  }
  public findOneAppoitment(id:number){
   return  this.http.get<ResponseData<Appoitment>>(baseLink+'/api/v1/appoitments/'+id,{
      withCredentials:true
    })
  }
 
}
