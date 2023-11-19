import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData, ResponseDataPagination } from '../models/Data';
import { baseLink } from 'src/utils/constants';
import { Field } from '../models/Field';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(public http:HttpClient) {

   }
   public addField(field:any){
      return  this.http.post<ResponseData<any>>(baseLink+'/api/v1/fields',field,{
        withCredentials:true
      })
   }
   public updateField(id:number,field:any){
    return  this.http.patch<ResponseData<any>>(baseLink+'/api/v1/fields/'+id,field,{
      withCredentials:true
    })

   }
   public deleteField(id:number){
    return  this.http.delete<ResponseData<any>>(baseLink+'/api/v1/fields/'+id,{
      withCredentials:true
    })

   }
   public findOneField(id:number){
    return  this.http.get<ResponseData<Field>>(baseLink+'/api/v1/fields/'+id,{
      withCredentials:true
    })
   }
   public readFields(){
    return  this.http.get<ResponseData<Field[]>>(baseLink+'/api/v1/fields',{
      withCredentials:true
    })

   }
   public getFieldsForCourses(){
    return  this.http.get<ResponseData<Field[]>>(baseLink+'/api/v1/courses-fields',{
      withCredentials:true
    })

   }
   public getFieldsForBlogs(){
    return  this.http.get<ResponseData<Field[]>>(baseLink+'/api/v1/blogs-fields',{
      withCredentials:true
    })

   }
   public getPermissions(modelNames:string[]){
    return  this.http.post<ResponseData<{[key:string]:string[]}>>(baseLink+'/api/v1/permission',{names:modelNames},{
      withCredentials:true
    })
   }
}
