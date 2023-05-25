import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TranslateService } from '../translate/translate.service';
import { environment } from 'src/environments/environments'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private translateService: TranslateService, private router:Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.translateService.getNumberOfTranslates() >= environment.freeTranslateNumber && this.authService.getUsername() === '') {
      this.router.navigateByUrl('registration');
      return false
    }
    return true;
  }

}
