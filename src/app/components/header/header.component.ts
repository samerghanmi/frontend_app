import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/model/user';
import { NewPostComponent } from '../post/new-post/new-post.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  isAuthenticated: boolean = false;
  constructor(private popup:MatDialog,private router: Router,private authService:AuthService) { }
  users:User[];
  ngOnInit(): void {
  this.isAuthenticated = this.authService.isAuthenticated;
   this.authService.getUser().subscribe(user => {
     console.log(user.user)
    this.user=user.user;
    console.log(this.user);
    
   });
   this.authService.getAllUsers().subscribe(users => {
    this.users=users;
    console.log(this.users);
   })
  }
   
   openDialog(){
     this.authService.checkAuth();
     if(this.isAuthenticated){
      const dialogRef=this.popup.open(NewPostComponent)
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['']);
      })
     }
  }
  logout(){
    this.authService.logout();
  }

  search(search:string){
    this.authService.getUserByName(search).subscribe(users =>{
      this.users=users.users;
    })
  }

}
