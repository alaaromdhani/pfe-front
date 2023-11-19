import { Permission } from "./Permission";
import { User } from "./User";

export class Role {
    id: number|undefined;
    name: string;
    weight: number;
    Users:User[]|undefined
    Permissions:Permission[]|undefined
    
  
  
    constructor(name:string,weight:number,users?:User[]|undefined,Permissions?:Permission[]|undefined) {
      this.name=name;
      this.weight=weight
      this.Users = users
      this.Permissions = Permissions
    }
   
  }