import { Injectable } from '@angular/core';
import * as sailsIoClient from 'sails.io.js';
import * as socketIoClient  from 'socket.io-client'
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public io:any
    public messages:Message[]=[]
  
  constructor() { 
    this.io =sailsIoClient(socketIoClient);
    this.io.sails.url ='http://romdhani.me/' 
    //@ts-ignore
     //console.log(Object.keys(this.io.io))
     
 
   }
   public connect(){
     //console.log('ala romdhani')
     
   }
   
   public logData(id:number,user_id:number){
 
     this.io.socket.get('/chat/connect/'+id+'/'+user_id ,function gotResponse(body:any, response:any) {
          console.log('Current users: ', body);
     })
       
     
   }
 
   public sendMessage(roomId:number,msg:string,user_id:number){
     
     this.io.socket.post('/chat/send/'+roomId+'/'+user_id,{content:msg},function gotResponse(data:any){
         console.log(data)
     })
   }
   public sendStatus(roomId:number,s:string,user_id:number){
     this.io.socket.get('/chat/writing/'+roomId+'/'+s+'/'+user_id,function gotResponse(data:any){
      
   })
   }
}
