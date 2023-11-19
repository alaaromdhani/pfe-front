
import { User } from "./User";

export class Appoitment{
    public id:number;
    public message:string;
    public date:string|null;
    public startingHour:number|null;
    public endingHour:number|null;
    public addedBy:number;
    public Patient?:User|undefined
    public Doctor?:User|undefined
    public createdAt:string
    constructor(id:number,message:string){
        
    }

}