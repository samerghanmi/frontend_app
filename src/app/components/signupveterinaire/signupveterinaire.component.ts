import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signupveterinaire',
  templateUrl: './signupveterinaire.component.html',
  styleUrls: ['./signupveterinaire.component.css']
})
export class SignupveterinaireComponent implements OnInit {
  success=false;
  registerForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phone: new FormControl(''),
    birthdate: new FormControl(''),
    adresse:new FormGroup({
      ville:new FormControl(''),
      region:new FormControl(''),
      street: new FormControl('')


    })
  });
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.success=this.authService.signupasveterinaire(this.registerForm)
    }
  }

}
