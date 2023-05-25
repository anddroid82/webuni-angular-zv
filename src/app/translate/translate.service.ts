import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments'


@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http:HttpClient) { }

  getNumberOfFreeTranslate():number {
    return environment.freeTranslateNumber;
  }

  getNumberOfTranslateLeft():number {
    return this.getNumberOfFreeTranslate()-this.getNumberOfTranslates();
  }

  getNumberOfTranslates(): number {
    let n = localStorage.getItem(environment.KEY_NUMBEROFTRANSLATES);
    if (!n) {
      return 0;
    } else {
      return Number.parseInt(n);
    }
  }

  incrementNumberOfTranslates() {
    const n = this.getNumberOfTranslates();
    localStorage.setItem(environment.KEY_NUMBEROFTRANSLATES, `${n + 1}`);
  }

  getLanguages() {
    let url = `${environment.GOOGLE_API_URL}languages?key=${environment.GOOGLE_API_KEY}&target=hu`;
    return this.http.get<any>(url);
  }

  translate(text:string,source:string,target:string){
    let url = `${environment.GOOGLE_API_URL}`;
    let formData = new FormData();
    formData.append('key',environment.GOOGLE_API_KEY);
    formData.append('q',text);
    formData.append('source',source);
    formData.append('target',target);
    return this.http.post<any>(url,formData);
  }

  detectLanguage(text:string) {
    let url = `${environment.GOOGLE_API_URL}detect`;
    let formData = new FormData();
    formData.append('key',environment.GOOGLE_API_KEY);
    formData.append('q',text);
    return this.http.post<any>(url,formData);
  }

}
