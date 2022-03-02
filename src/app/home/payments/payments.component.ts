import { Component, OnInit } from '@angular/core';
import { PaymentsService } from './services/payments.service';
import * as txml from 'txml';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  nmi: any;

  constructor(public payment: PaymentsService) { }

  ngOnInit(): void {
    this.payment.getPaymentTransactions().subscribe(transactions => {
      if(transactions != null || undefined) {
        this.nmi = transactions.join("")
        console.log(txml.simplify(txml.parse(this.nmi)))

      }
    })
  }

}
