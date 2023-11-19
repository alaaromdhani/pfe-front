import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseLink } from 'src/utils/constants';
import { ResponseData, ResponseDataPagination } from '../models/Data';
import { Field } from '../models/Field';
import { CoursVideo } from '../models/CoursVideo';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(public http:HttpClient ) { }
  public addCourse(course:any){
    return   this.http.post<ResponseData<any>>(baseLink+'/api/v1/courses',course,{
        withCredentials:true
      })

  }
  public updateCourse(id:number,course:any){
    return this.http.patch<ResponseData<any>>(baseLink+'/api/v1/courses/'+id,course,{
      withCredentials:true
    })

  }
  public addDocumentCourse(formData:FormData){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/documentcourses',formData,{
      withCredentials:true
    })
  }
  public coursesTree(){
    return this.http.get<ResponseData<Field[]>>(baseLink+'/api/v1/coursetree',{
      withCredentials:true
    })
  }
  public getVideoCourses(parent:number){
    return this.http.get<ResponseDataPagination<CoursVideo>>(baseLink+'/api/v1/coursvideos?parent='+parent,{
      withCredentials:true
    })
  }
  public createVideoCourse(course:any){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/coursvideos',course,{
      withCredentials:true
    })
  }
  public findOneVideoCourse(id:number){
    return this.http.get<ResponseData<CoursVideo>>(baseLink+'/api/v1/coursvideos',{
      withCredentials:true
    })
  }
  public rateVideoCourse(id:number,rate:{rating:number}){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/rate/'+id,rate,{
      withCredentials:true
    })
  }
  public updateVideoCourse(id:number,course:any){
    return this.http.patch<ResponseData<any>>(baseLink+'/api/v1/coursvideos/'+id,course,{
      withCredentials:true
    })
  }
  public delteVideoCourse(id:number){
    return this.http.delete<ResponseData<any>>(baseLink+'/api/v1/coursvideos/'+id,{
      withCredentials:true
    })
  }

}
