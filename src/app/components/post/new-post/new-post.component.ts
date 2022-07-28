import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
 

  constructor(private postService: PostService,private authService: AuthService,private router: Router) { }
  
  ngOnInit(): void {
  }
  

  addPost(description,postimages,categorie) {
    this.authService.checkAuth()
    const images : File = postimages.files;
    const text : string = description.value
    this.postService.addPost(text,images,categorie.value).subscribe(response=>{
    })
  }

}
