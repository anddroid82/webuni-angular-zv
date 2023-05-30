import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCovidGuard } from './auth/auth-covid.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'covid',
    pathMatch: 'full'
  },
  {
    path:'registration',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path:'covid',
    canActivate: [AuthCovidGuard],
    loadChildren: () => import('./covid/covid.module').then( m => m.CovidModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
