import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.css']
})
export class MyappointmentsComponent implements OnInit {


  id
  appointments
  constructor(private activatedRoute: ActivatedRoute, private  appService: AppointmentService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next:paramMap=>{
        this.id= paramMap.get('id')
        console.log(this.id)
      }
    })
    this.appService.getMyAppointments(this.id).subscribe(appointments=>{
      this.appointments = appointments;
      console.log(this.appointments)
    })
  }
  approvedStatus(status){
    return{
      ' bg-success text-white': status ==true ? true : false,

      ' bg-warning text-white': status == true ? false : true

    }
  }
}
