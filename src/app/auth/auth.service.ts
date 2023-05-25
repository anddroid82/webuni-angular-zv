import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {environment} from 'src/environments/environments'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usernameSubject:BehaviorSubject<string>;
  constructor() {
    this.usernameSubject = new BehaviorSubject(this.getUsernameFromStorage());
  }

  getUsernameFromStorage(){
    let userString = localStorage.getItem(environment.KEY_USERNAME);
    return userString || '';
  }

  getUsername():string {
    return this.usernameSubject.value;
  }

  getUsernameSubject(){
    return this.usernameSubject;
  }

  isLoggedIn(){
    return this.getUsername()!=='';
  }

  setUsername(name:string) {
    this.usernameSubject.next(name);
    localStorage.setItem(environment.KEY_USERNAME,name);
  }

  clearUsername(){
    this.getUsernameSubject().next('');
    localStorage.removeItem(environment.KEY_USERNAME);
  }

}
