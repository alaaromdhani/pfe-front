import { User } from "./User";

export class BlogComment{
    public id?:number|undefined;
    public content:string;
    public User?:User|undefined
    constructor(content:string){
        this.content = content 
    }


}