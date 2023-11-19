import { Model } from "./Model";

export class Permission{
    public id:number;
    public Model:Model|undefined;
    public action:string
    constructor(id:number,action:string,model?:Model){
        this.id= id;
        
        this.action = action,
        this.Model = model



    }




}