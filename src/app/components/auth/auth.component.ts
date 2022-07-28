import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog"
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginFailed=false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
    constructor(private dialog:MatDialog,private authService:AuthService,private router:Router) { }

    ngOnInit() {
    
    }

    signInWithGoogle(){
      this.authService.signInWithGoogle();
    }
    onSubmit(){

      const token=this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      if(token){
        this.loginFailed=false;
        this.router.navigate(['']);
      }else{
        this.loginFailed=true;
      }
    }

}

