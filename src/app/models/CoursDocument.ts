import { BlogComment } from "./BlogComment";
import { Field } from "./Field";
import { Upload } from "./Upload";


export class CoursDocument{
    public id:number;
    public name:string;
    public description:string;
    public parent:number;
    public rating:number
    public Upload:Upload
    constructor(title:string,description:string){
        this.name = title
        this.description = description
        
    
    }

}