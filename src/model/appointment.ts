import { User } from "./user";

export class Appointment{
    constructor(public date:Date,public hour:string, public description:string, public user:string, public veterinaire:string){}
}