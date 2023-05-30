import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Chart1 } from './model/chart1.model';
import { Observable } from 'rxjs';

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

  getAllCountryChart1Data(){
    let returnedData :number = 0;
    let data:Chart1[] = [];
    let observer:Observable<Chart1[]> = new Observable((observer)=>{
      environment.coivdCountrys.forEach(element => {
        let url = `${environment.COVID_API_URL}cases?country=${element}`;
        this.http.get<any>(url).subscribe( d => {
          data.push(new Chart1(d.country,d.deaths,d.population,d.sq_km_area));
          returnedData++;
          if (returnedData === environment.coivdCountrys.length) {
            return observer.next(data);
          }
        })
      });
    });
    return observer;
  }


}
