import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidComponent } from './covid/covid.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path:'',
    component: CovidComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidRoutingModule { }
