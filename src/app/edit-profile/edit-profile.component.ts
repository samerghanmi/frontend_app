import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm:FormGroup=new FormGroup({
    fname: new FormControl('',[Validators.maxLength(10)]),
    lname: new FormControl('',[Validators.maxLength(10)]),
    email: new FormControl('',[Validators.email]),
    phone: new FormControl('',[Validators.pattern("[0-9 ]{8}")]),
    birthdate: new FormControl(''),
    image: new FormControl(''),
  });

  user:User;
  imagePreview:string;
  constructor(private authService:AuthService,public router:Router) {

   }

  ngOnInit(): void {
    console.log('hello from onInit')
    this.authService.getUser().subscribe(user => {
      this.user=user.user;
      //console.log(this.user);
    }); 
  }

  onImagePicked(imageInput: any,image:any) {
    const file : File = imageInput.files[0];
    this.profileForm.patchValue({image: file});
    console.log(file);
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview=reader.result as string;
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
}
  onSubmit(){
    if(!this.profileForm.invalid){
      this.authService.updateUser(this.profileForm.value).subscribe(user => {
        this.router.navigate(["profile"]);
      })
    }
  }


}
