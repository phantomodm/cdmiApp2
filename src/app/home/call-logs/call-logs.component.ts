import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CallLogService } from './call-log-service.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { GmailMessage } from 'src/app/services/model/gmail-message';

interface Message{
  name:string;
  phone:string;
  email:string;
  message:string;
}

@Component({
  selector: 'app-call-logs',
  templateUrl: './call-logs.component.html',
  styleUrls: ['./call-logs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight:'0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class CallLogsComponent implements OnInit {
  dataSource!: GmailMessage[];
  columnsToDisplay = ['date', 'name', 'phone', 'email'];
  expandedCall!: GmailMessage | null;

  constructor(public call: CallLogService) { }

  ngOnInit(): void {
    this.call.getCallsFromGmail().subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource)
    });
  }
}
