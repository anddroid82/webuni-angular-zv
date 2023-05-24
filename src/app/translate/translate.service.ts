import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environments'

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }

  getNumberOfTranslates():number{
    let n = localStorage.getItem(environment.KEY_NUMBEROFTRANSLATES);
    if (!n) {
      return 0;
    }else{
      return Number.parseInt(n);
    }
  }

  incrementNumberOfTranslates() {
    const n = this.getNumberOfTranslates();
    localStorage.setItem(environment.KEY_NUMBEROFTRANSLATES,`${n+1}`);
  }
}
