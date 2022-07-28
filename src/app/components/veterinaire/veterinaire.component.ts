import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { VeterinaireService } from '../../services/veterinaire.service';

@Component({
  selector: 'app-veterinaire',
  templateUrl: './veterinaire.component.html',
  styleUrls: ['./veterinaire.component.css']
})
export class VeterinaireComponent implements OnInit {
  veterinaires: User[]=[]
  constructor(private veterinaireService:VeterinaireService) { }

  ngonchange() {}
  ngOnInit(): void {

  this.veterinaireService.getVeterinaires().subscribe(resultat=>{
    this.veterinaires=resultat as User[];
    console.log(this.veterinaires)

  });

  }
  Delete(id){
    this.veterinaireService.delete(id).subscribe(resultat=>{
      console.log(resultat)
    })
  }
  Uprove(id){

  }

}
