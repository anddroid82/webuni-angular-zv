import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'translate',
    pathMatch: 'full'
  },
  {
    path:'registration',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
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
