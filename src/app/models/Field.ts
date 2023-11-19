import { Course } from "./Course";

export class Field{
    public id:number;
    public name:string;
    public short_description:string;
    public color:string
    public Courses:Course[]
    constructor(id:number,name:string,short_description:string,color:string){
        this.id= id;
        this.name=name
        this.short_description = short_description
        this.color=color    
     }



}