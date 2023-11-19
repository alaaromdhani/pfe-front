import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, ResponseData, ResponseDataPagination } from '../models/Data';
import { Role } from '../models/Role';
import { baseLink } from 'src/utils/constants';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { ChatRoom } from '../models/ChatRoom';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(public http:HttpClient) { }
  public getRoles(){
    return this.http.get<ResponseDataPagination<Role>>(baseLink+'/api/v1/roles',{
      withCredentials:true
    }) 

  }
  public findOneRole(id:number){
    return this.http.get<ResponseData<Role>>(baseLink+`/api/v1/roles/${id}`,{
      withCredentials:true
    })

  }
  public updateRole(id:number,role:{name:string,weight:number,permissions:{model:string,actions:string[]}[]}){
    return this.http.patch<ResponseData<any>>(baseLink+`/api/v1/roles/${id}`,role,{
      withCredentials:true
    })
  }
  public createRole(role:any){
    return this.http.post<ResponseData<any>>(baseLink+'/api/v1/roles',role,{
      withCredentials:true
    })

  }
  public deleteRole(id:number){
    return this.http.delete<ResponseData<any>>(baseLink+`/api/v1/roles/${id}`,{
      withCredentials:true
    })
  }
  public getUsers(){
    return this.http.get<ResponseDataPagination<User>>(baseLink+'/api/v1/users',{
      withCredentials:true
    })
  }
  public findOneUser(id:number){
    return this.http.get<ResponseData<User>>(baseLink+`/api/v1/users/${id}`,{
      withCredentials:true
    })
  }
  public addUser(user:any){
    return this.http.post<ResponseData<any>>(baseLink+`/api/v1/users`,user,{
      withCredentials:true
    }) 
  }
  public searchUser(query:string){
    return this.http.get<ResponseDataPagination<User>>(baseLink+'/api/v1/users?search='+query,{
      withCredentials:true
    })
  }
  public updateUser(id:number,formdata:FormData):Observable<ResponseData<any>>{
    return this.http.patch<ResponseData<any>>(baseLink+'/api/v1/users/'+id,formdata,{
      withCredentials:true
    })
  }
  public deleteUser(id:number){
    return this.http.delete<ResponseData<any>>(baseLink+`/api/v1/users/${id}`,{
      withCredentials:true
    })
  }
  public findByRole(role:string){
    return this.http.get<ResponseData<User[]>>(baseLink+`/api/v1/users/find/${role}`,{
      withCredentials:true
    })

  }
  public createRoom(users_id:number[]){
    return  this.http.post<{id:number}>(baseLink+'/chat/create',users_id,{
          withCredentials:true
    })
  }
  public getCurrentUser(){
   return this.http.get<ResponseData<User>>(baseLink+'/profile/me',{
    withCredentials:true
   })

  }
  public getChatRoom(roomId:number,user_id:number){
    return this.http.get<ResponseData<ChatRoom>>(baseLink+'/chat/join/'+roomId+'/'+user_id)
  }
  public getUsersForChat(){
    return this.http.get<ResponseData<User[]>>(baseLink+'/api/v1/chat/users',{withCredentials:true})
  }
  
}
