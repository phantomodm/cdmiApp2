import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const API_URL = 'http://localhost:9000';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  getPaymentTransactions(): Observable<any> {
    return this.http.get<any>(`${API_URL}/transactions`)
      .pipe(
        tap(res => console.log(res))
        );
  }
}
