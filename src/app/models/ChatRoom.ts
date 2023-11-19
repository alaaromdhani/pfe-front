import { Message } from "./Message";
import { User } from "./User";

export class ChatRoom{
    public id:number;
    public Users:User[]|undefined
    public Messages:Message[]|undefined
    constructor(id:number,Users?:User[],Messages?:Message[]){
        this.id = id
        this.Users = Users
        this.Messages = Messages
    }
}