import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  
  constructor(private http: HttpClient) { }

  getNumberOfFreeCovidSearch(): number {
    return environment.freeCovidSearch;
  }

  getNumberOfCovidSearchLeft(): number {
    return this.getNumberOfFreeCovidSearch() - this.getNumberOfCovidSearch();
  }

  getNumberOfCovidSearch(): number {
    let n = localStorage.getItem(environment.KEY_NUMBEROFCOVIDSEARCH);
    if (!n) {
      return 0;
    } else {
      return Number.parseInt(n);
    }
  }

  incrementNumberOfCovidSearch() {
    const n = this.getNumberOfCovidSearch();
    localStorage.setItem(environment.KEY_NUMBEROFCOVIDSEARCH, `${n + 1}`);
  }

  getCovidCountrys() {
    return environment.coivdCountrys;
  }

  getCovidDataByCountry(c:string) {
    let url = `${environment.COVID_API_URL}cases?country=${c}`;
    return this.http.get<any>(url);
  }

  

}
