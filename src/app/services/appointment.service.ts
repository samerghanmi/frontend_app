import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/model/appointment';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  api: string = "http://localhost:3000/api/"


  constructor(private http: HttpClient) {
  }
  getAppointments(id) {
    return this.http.get(this.getApi() + 'appointement/' + id)

  }

  getMyAppointments(id) {
    return this.http.get(this.getApi() + 'appointement/myappointments/' + id)
  }

  approveAppointment(id) {
    return this.http.put(this.getApi() + 'appointement/' + id, '')
  }
  takeAppointment(appointment) {

    return this.http.post(this.getApi() + 'appointement/', appointment)
  }
  getApi() {
    return this.api
  }
}
