import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffiliateComponent } from './affiliate.component';
import { AffiliateRoutingModule } from './affiliate.routing';
import { MaterialModule } from 'src/app/flat-modules/material.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';



@NgModule({
  declarations: [
    AffiliateComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    AffiliateRoutingModule,
    MaterialModule
  ]
})
export class AffiliateModule { }
