import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Appointment } from 'src/model/appointment';
import { User } from 'src/model/user';

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.css']
})
export class TakeAppointmentComponent implements OnInit {
  selected:string
  Hours=['08:00','09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00','17:00']
  id
  user:User ;
  Appointment = new FormControl();
  // table:string[]=[]
  appointments:any

  //appointment group for formulaire
  appointmentGroup = new FormGroup({
    hourAppointment: new FormControl(''),
    dateAppointment: new FormControl(''),
    description: new FormControl(''),

  })

  constructor(private appointmentService:AppointmentService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    
     this.appointmentService.getAppointments(this.id).subscribe(appointments=>{
      this.appointments = appointments;
      console.log(this.appointments);
      // console.log(this.appointments[0]['date'].slice(11,16))
      // console.log(this.Hours.includes('00:00'));
      this.appointments.forEach(element => {
        
       if(this.Hours.includes(element['date'].slice(11,16))){
         this.Hours.splice(this.Hours.indexOf(element['date'].slice(11,16)),1);
       }
    
        
      });
      // console.log(this.table);
      
      // this.table = this.appointments.filter((x)=>{
      //   this.Hours.includes(x['date'].slice(11,16))
      //   // console.log(x['date'].slice(11,16));
         
      // })
      // console.log(this.table)
      

    })
    //pour recupérer le user
      this.authService.getUser().subscribe((user)=>{
        this.user = user.user 
      })
      // pour récupérer l'id de veterinaire
      this.activatedRoute.params.subscribe({
        next:param=>{
          this.id= param['id']
        }
      })
    

  }

  takeAppointmentSubmit(){
    console.log(this.appointmentGroup.value)
    console.log(this.id)
    let date = this.appointmentGroup.value.dateAppointment
    let hour = this.appointmentGroup.value.hourAppointment
    let description = this.appointmentGroup.value.description
    let veterinary
    const appointment = new Appointment(date,hour,description,this.user['id'],this.id)
    if(this.appointmentGroup.valid){
      this.appointmentService.takeAppointment(appointment).subscribe(resultat=>{
        console.log(resultat)
        this.router.navigate([''])
      })
    }
  }
 
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  AvailableHour(){

  }


}


