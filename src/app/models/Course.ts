import { BlogComment } from "./BlogComment";
import { CoursDocument } from "./CoursDocument";
import { CoursVideo } from "./CoursVideo";
import { Field } from "./Field";


export class Course{
    public id:number;
    public name:string;
    public description:string;
    public field_id:number;
    public Field:Field
    public rating:number
    public CoursDocuments:CoursDocument[]
    
    public CoursVideos:CoursVideo[]
    //  public BlogComments:BlogComment[] | undefined
     
    constructor(title:string,description:string,Field:Field){
        this.name = title
        this.description = description
        this.Field =Field

    }

}