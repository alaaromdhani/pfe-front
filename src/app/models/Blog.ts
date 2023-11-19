import { BlogComment } from "./BlogComment";
import { Field } from "./Field";
import { Upload } from "./Upload";
import { User } from "./User";

export class Blog{
    public id:number;
    public title:string;
    public description:string;
    public Banner?:Upload|undefined
    public Fields:Field[]
    public User?:User|undefined
    public BlogComments:BlogComment[] | undefined
    constructor(title:string,description:string,Fields:Field[]){
        this.title = title
        this.description = description
        this.Fields =Fields
    }

}