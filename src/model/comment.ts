import { Post } from "./post";
import { User } from "./user";

export class Comment{
    constructor(public _id:string,public text:string,public date:Date,public user:User,public post:Post) {}
}