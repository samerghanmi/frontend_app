import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  api = "http://localhost:3000/api/upgradeRequest"
  constructor(public http:HttpClient) { }
  send(request,id): Observable<any>{
    let requestInfo = new FormData()
    requestInfo.append("attachedFile",request.file)
    requestInfo.append("description",request.description)
    return this.http.post(this.api + "/send/" + id,requestInfo)
  }
}
