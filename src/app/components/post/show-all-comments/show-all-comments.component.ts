import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/model/post';
import { User } from 'src/model/user';

@Component({
  selector: 'app-show-all-comments',
  templateUrl: './show-all-comments.component.html',
  styleUrls: ['./show-all-comments.component.css']
})
export class ShowAllCommentsComponent implements OnInit {

  comments: any[]
  image: any
  userid: string
  @Input() idpost: string
  text: string
  showOldComment: boolean = true
  user:User
  constructor(private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user=user.user;
      console.log(this.user);
    });
    this.showPostComments(this.idpost)
    // this.activatedRoute.params.subscribe({
    //   next: param => {
    //     this.idpost = param['id'];
    //   }
    // })
    console.log(this.idpost);
    
  }
  extractUserImage() {
    this.userid = this.authService.getUserId()
  }
  showPostComments(postid: string) {
    console.log(this.idpost)
    this.postService.getAllComments(this.idpost).subscribe(resultat => {
      this.comments = resultat
      console.log(resultat)
      this.extractUserImage()
    })
  }

  addComment(comment) {
    console.log('idpost : '+ this.idpost);
    
    this.postService.addComment(this.idpost, comment).subscribe(resultat => {
      console.log(resultat);
      console.log(comment)
      this.comments.push(resultat)
      this.router.navigate([''])
    })
  }
  deleteComment(idcomment: string) {
    this.postService.deleteComment(this.idpost, idcomment).subscribe(resultat => {
      this.comments = this.comments.filter(comment => {
        console.log(idcomment)
        return comment._id != idcomment
      })
    })
  }
  cancelchanges(newComment, cancel, validateLink) {
    newComment.style.display = "none"
    cancel.style.display = "none"
    validateLink.style.display = "none"
    this.showOldComment = true
  }
  validate(newComment, idcomment, cancel, validateLink) {
    this.postService.updateComment(this.idpost, idcomment, newComment.value).subscribe(resultat => {
      this.comments = resultat.comments
      newComment.style.display = "none"
      cancel.style.display = "none"
      validateLink.style.display = "none"
      this.showOldComment = true
      console.log(this.idpost, idcomment)
    })

  }

  editComment(idcomment: string, newComment, cancel, validateLink) {
    const comment = this.comments.find(comment => {
      return comment._id == idcomment
    })
    newComment.value = comment.text
    newComment.style.display = ""
    cancel.style.display = ""
    validateLink.style.display = ""
    this.showOldComment = false

  }
}
