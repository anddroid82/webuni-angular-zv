import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environments'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUsername():string|undefined {
    let userString = localStorage.getItem(environment.KEY_USERNAME);
    if (!userString) {
      return undefined;
    }else{
      return userString;
    }
  }

  setUsername(name:string) {
    localStorage.setItem(environment.KEY_USERNAME,name);
  }

  clearUsername(){
    localStorage.removeItem(environment.KEY_USERNAME);
  }

}
