
import { Upload } from "./Upload";


export class CoursVideo{
    public id:number;
    public name:string;
    public description:string;
    public parent:number;
    public rating:number
    public source:string
    public url:string

    public Upload:Upload
    constructor(title:string,description:string){
        this.name = title
        this.description = description
        
    
    }

}