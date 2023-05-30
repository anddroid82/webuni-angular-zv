import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';
import { Chart1 } from '../model/chart1.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  data:Chart1[] = [];
  loading: boolean = true;
  result: any[] = [];
  view: [number,number] = [700, 400];

  legendTitle: string = 'Covid';
  xAxisLabel: string = 'Ország';
  yAxisLabel: string = 'Érték';

  constructor(private covidService:CovidService){
  }

  ngOnInit(): void {
    this.covidService.getAllCountryChart1Data().subscribe( d => {
      d.sort( (a,b)=>{
        return a.death-b.death;
      });
      this.result = [];
      this.loading = false;
      d.forEach( c => {
        this.result.push({
          "name":c.country,
          "series":[
            {
              "name":"Terület",
              "value":c.area
            },
            /*{
              "name":"Népesség",
              "value":c.population
            },*/
            {
              "name":"Halálozás",
              "value":c.death
            }
          ]
        })
      });
    })
  }

}
