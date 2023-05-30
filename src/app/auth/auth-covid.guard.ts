import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CovidService } from '../covid/covid.service';
import { environment } from 'src/environments/environments'

@Injectable({
  providedIn: 'root'
})
export class AuthCovidGuard implements CanActivate {
  constructor(private authService: AuthService, private covidService: CovidService, private router:Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.covidService.getNumberOfCovidSearch() >= environment.freeCovidSearch && this.authService.getUsername() === '') {
        this.router.navigateByUrl('registration');
        return false
      }
      return true;
  }
  
}
