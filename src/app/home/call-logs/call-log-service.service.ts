import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9000'
@Injectable({
  providedIn: 'root'
})
export class CallLogService {

  constructor(private http: HttpClient) { }

  getCallsFromGmail(): Observable<any>{
    return this.http.get<any>(`${API_URL}/messages`)
  }
}
