import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from 'src/model/authData';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token?: string;
  isAuthenticated?: boolean;
  private userId:string;
  private user : User;
  constructor(private http:HttpClient,private router:Router,private googleAuthService:SocialAuthService) { }
  getUserId():string {
    return this.userId;
  }
  getToken(){ return this.token; }  
  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  checkAuth(){
    if (!(this.isAuthenticated))
    {
      this.router.navigate(['login'])
    }
    return false;
    }
    getAllUsers(){
      return this.http.get<User[]>(`http://localhost:3000/api/users`);
    }

  getUser(){
    return this.http.get<{user:User}>(`http://localhost:3000/api/users/${this.userId}`);
  }
  getUserByName(name:string){
    return this.http.get<{users:any[]}>(`http://localhost:3000/api/users/search?name=${name}`)
  }
  getUserById(id:any){
    return this.http.get<{user:User}>(`http://localhost:3000/api/users/${id}`);
  }

  updateUser(form:any){
    let user;
    
    if(form.image){
      user = new FormData()
      for(let field in form){
        if (form[field].length>1){
          
          user.append(field,form[field])
        }
      }
      user.append("image",form.image)
      console.log("user with image")
      console.log(user.get("image"));
    }else{
      user = {}
      for(let field in form){
        if (form[field].length>1){
          user[field] = form[field];
        }
      }
      console.log("user without image")
      console.log(user);
    }
/*     if(user.birthdate){
      user.birthdate = new Date(user.birthdate);
    } */
    return this.http.put<{user:any}>(`http://localhost:3000/api/users/${this.userId}`,user);
  }
  signupasveterinaire(form:FormGroup){
    let success;
    console.log(form.value)
    const user = {
      fname:form.value.fname,
      lname:form.value.lname,
      email:form.value.email,
      password:form.value.password,
      role:'user',
      birthdate:form.value.birthdate,
      phone:form.value.phone,
      adresse:form.value.adresse,
    }
    this.http.post("http://localhost:3000/api/users/signup",user).subscribe(response => {
      if(response["error"]){
        success = false;
        return null;
      }
      success=true
      this.router.navigate(["/login"])
    })
    return success;
  }
  
  signup(form:FormGroup){
    let success;
    console.log(form.value)
    const user = {
      fname:form.value.fname,
      lname:form.value.lname,
      email:form.value.email,
      password:form.value.password,
      birthdate:form.value.birthdate,
      phone:form.value.phone,
    }
    this.http.post("http://localhost:3000/api/users/signup",user).subscribe(response => {
      if(response["error"]){
        success = false;
        return null;
      }
      success=true
      this.router.navigate(["/login"])
    })
    return success;
  }

  login(email: string, password: string){
    console.log(email)
    console.log(password)
    this.http.post<{token:string,expiresIn:number, userId:string}>("http://localhost:3000/api/users/login",{email:email,password:password}).subscribe(response => {
      console.log(response);
      this.token=response.token;
      if(this.token){
        this.setAuthTimer(response.expiresIn)
        this.isAuthenticated=true;
        this.userId=response.userId;
        console.log(this.userId);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
        this.saveAuthData(this.token,expirationDate)
        this.authStatusListener.next(true);
        this.http.get<{user:User}>(`http://localhost:3000/api/users/${this.userId}`).subscribe(responce => {
          this.user=responce.user;
        })
        this.router.navigate(["/"]);
      }

    })
    return this.token;
  }

  logout(){
    this.token="";
    this.isAuthenticated=false;
    this.authStatusListener.next(false)
    this.clearAuthData();

    this.router.navigate(["/login"]);
  }

  setAuthTimer(expiresIn:number){
    setTimeout(() =>{
      this.logout();

    },expiresIn*1000);
  }
  autoAuthUser(){
    const authData = this.getAuthData();
    if(!authData){
      return;
    }
    const now = new Date();
    const expiresIn= authData.expirationDate.getTime()- now.getTime();
    if(expiresIn>0){
      this.token=authData.token;
      this.isAuthenticated=true;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true);

    }
  }

  private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString());
    localStorage.setItem("userId",this.userId);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("expiration"))
  }
  
private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    this.userId=localStorage.getItem("userId")
    if(!token || !expirationDate) return null;
    return {token:token,expirationDate:new Date(expirationDate)}
  }




  //======== Google Authentification ===========

  signInWithGoogle(): void {
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.googleAuthService.authState.subscribe((user) => {
      if(user){
        this.isAuthenticated = true;
        this.token=user.idToken;
        const date = new Date();
        const expirationDate = date.getTime()+user.response.expires_in
        this.saveAuthData(this.token,new Date(expirationDate));
        this.setAuthTimer(user.response.expires_in);
        console.log(user);
        const newUser = {fname:user.name,lname:user.lastName,email:user.email,image:user.photoUrl,googleId:user.id}
       this.http.post<{message:string,user:User}>("http://localhost:3000/api/users/googleAuth",newUser).subscribe((response) => {
        console.log(response);
        const user = response.user;
        this.user=response.user;
        this.router.navigate(['']);
        },(error)=>{
          console.log(error);
        })
      }
      
    });
  }


  signOut(): void {
    this.googleAuthService.signOut();
  }

  refreshToken(): void {
    this.googleAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }




}
