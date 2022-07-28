import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/model/appointment';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  id:string
  appointments:Appointment[]
  constructor(private appointmentService: AppointmentService, private activatedRoute: ActivatedRoute, private router:Router) { 
   
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next:param=>{
        this.id=param['id']
      }
    })
    this.appointmentService.getAppointments(this.id).subscribe(resultat=>{
      this.appointments=resultat as Appointment[]
    })
  }

  Uprove(id){
    this.appointmentService.approveAppointment(id).subscribe(resultat=>{
      this.ngOnInit()
    })


  }
  approvedStatus(status){
    return{
      'bg-success text-white': status ==true ? true : false,
      'bg-warning text-white': status == true ? false : true

    }

  }
}
