import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";


export class Post{
    [x: string]: any;
    constructor(public _id:string,public description:string,public images:string[], public date:Date,public user:User,public comment:Comment[], public like:Like){}
}