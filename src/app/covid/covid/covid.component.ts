import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
  options: string[];
  filteredOptions: Observable<string[]> = new Observable();
  searchControl = new FormControl('');
  country: string = '';
  covidData: any;
  covidKeys: string[] = [];

  loggedIn: boolean = false;
  covidSearchLeft: number = 0;

  constructor(private covidService: CovidService, private router: Router, private authService: AuthService) {
    this.options = this.covidService.getCovidCountrys();
    this.loggedIn = this.authService.isLoggedIn();
    this.covidSearchLeft = this.covidService.getNumberOfCovidSearchLeft();
  }

  countryChanged() {
    if (this.loggedIn || this.covidSearchLeft > 0) {
      this.covidService.getCovidDataByCountry(this.searchControl.value || '').subscribe(d => {
        this.covidData = d;
        this.covidKeys = Object.keys(this.covidData);
      });

      this.covidService.incrementNumberOfCovidSearch();
      this.covidSearchLeft = this.covidService.getNumberOfCovidSearchLeft();
    }

  }

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
