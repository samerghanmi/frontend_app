import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-upgrade-request',
  templateUrl: './upgrade-request.component.html',
  styleUrls: ['./upgrade-request.component.css']
})
export class UpgradeRequestComponent implements OnInit {

id:string
imagePreview:string
  upgradeRequest= new FormGroup({
    description: new FormControl('',Validators.required),
    file: new FormControl('',Validators.required),
  })
  constructor(private activatedRoute: ActivatedRoute, private upgradeService:UpgradeService,public router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:paramMap=>{
        this.id=paramMap.get('id')
        console.log('id:' + this.id)
      }
    })

  }

  onImagePicked(imageInput: any,image:any) {
    const file : File = imageInput.files[0];
    this.upgradeRequest.patchValue({image: file});
    console.log(file);
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview=reader.result as string;
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
}

  upgradeSubmit(){
    if(this.upgradeRequest.valid){
      this.upgradeService.send(this.upgradeRequest.value,this.id).subscribe(result=>{
        console.log(result)
        this.router.navigate([''])
      })
    }

  }

}
