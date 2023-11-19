import { Field } from "./Field";
import { Permission } from "./Permission";
import { Role } from "./Role";

export class User {
 public id: number;
 public firstName: string;
 public lastName: string;
 public username: string;
 public sex: string;
 public birthDate: string;
 public state_id: number ;
 public country_id:number

 public email: string;
 public phonenumber: string;
 public password: string;
 public Role:Role|undefined
 public role_id:number
 public profilePicture:string
 public Permissions:Permission[]|undefined
 public Fields:Field[]
 public connected:boolean




  constructor(firstName: string, lastName: string, username: string, sexe: string, birthDate: string,
              email: string, phoneNumber: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.sex = sexe;
    this.birthDate = birthDate;
    this.email = email;
    this.phonenumber = phoneNumber;
    this.password = password;
    
        
      
  }
}
