import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then( m => m.HomeModule) },
  { path: 'affiliate', loadChildren: () => import('./home/affiliate/affiliate.module').then(m => m.AffiliateModule) },
  { path: 'calls', loadChildren: () => import('./home/call-logs/call-logs.module').then(m => m.CallLogsModule) },
  { path: 'login', component: LoginComponent},
  { path: 'payments', loadChildren: () => import('./home/payments/payments.module').then(m => m.PaymentsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
