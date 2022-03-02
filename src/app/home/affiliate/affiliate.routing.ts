import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AffiliateComponent } from './affiliate.component';

const routes: Routes = [
  { path: '', component: AffiliateComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliateRoutingModule {}
