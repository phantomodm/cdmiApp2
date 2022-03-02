import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallLogsRoutingModule } from './call-logs.routing';
import { MaterialModule } from 'src/app/flat-modules/material.module';
import { CallLogsComponent } from './call-logs.component';



@NgModule({
  declarations: [CallLogsComponent],
  imports: [
    CommonModule,
    CallLogsRoutingModule,
    MaterialModule
  ]
})
export class CallLogsModule { }
