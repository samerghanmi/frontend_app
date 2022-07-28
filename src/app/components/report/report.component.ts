import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  showMsg:boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: {idpost: string,userId:string}, private postService: PostService, public dialogRef: MatDialogRef<MatDialog>
  ) { 
    
  }

  ngOnInit(): void {
   
  }

  submit(description){
    console.log(description.value);
    let report= {
      "description":description.value,
      "id_post":this.data.idpost,
      "id_sender":this.data.userId,

    }
    this.postService.report(report).subscribe(result=>{
      console.log(result)
      this.showMsg = true
      this.dialogRef.close()
      
    })


   
  }

}
