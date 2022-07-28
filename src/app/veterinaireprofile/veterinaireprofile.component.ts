import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/model/user';
import { Veterinaire } from 'src/model/veterinaire';
import { VeterinaireService } from '../services/veterinaire.service';

@Component({
  selector: 'app-veterinaireprofile',
  templateUrl: './veterinaireprofile.component.html',
  styleUrls: ['./veterinaireprofile.component.css']
})
export class VeterinaireprofileComponent implements OnInit {
  id
  veterinaire
  isloading:boolean
  constructor(private ActivatedRoute: ActivatedRoute, private veterinaireService:VeterinaireService) { }

  ngOnInit(): void {
    this.isloading=false
    this.ActivatedRoute.paramMap.subscribe({
      next:paramMap=>{
        this.id=paramMap.get('id')
        console.log(this.id)
        
      }
    })
    this.veterinaireService.getById(this.id).subscribe(result=>{
      this.veterinaire= result[0] as Veterinaire
      console.log(result);
      
       console.log(this.veterinaire)
       this.isloading=true


      })
      // console.log(this.veterinaire)



   
  }

}
