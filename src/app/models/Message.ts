import { ChatRoom } from "./ChatRoom";
import { User } from "./User";


export class Message {
    id: number|undefined;
    content: string;
    sender:number|undefined;
    room_id:number|undefined
    ChatRoom:ChatRoom|undefined
    User:User|undefined
    
   constructor(content:string,id?:number,sender?:number,room_id?:number,chatRoom?:ChatRoom,User?:User) {
       this.content = content
       if(id){
        this.id=id
       }
       if(sender){
        this.sender=sender
       }
       this.room_id = room_id
         this.ChatRoom = chatRoom
        this.User = User
    }
   
  }