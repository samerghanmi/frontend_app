import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  success=false;
  registerForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phone: new FormControl(''),
    birthdate: new FormControl(''),
  });
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.registerForm.valid){
      this.success=this.authService.signup(this.registerForm)
    }
  }
}
