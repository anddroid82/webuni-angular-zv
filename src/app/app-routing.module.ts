import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
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
  },
  {
    path:'translate',
    canActivate: [AuthGuard],
    loadChildren: () => import('./translate/translate.module').then( m => m.TranslateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
