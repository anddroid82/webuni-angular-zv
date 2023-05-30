import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovidComponent } from './covid/covid.component';
import { CovidRoutingModule } from './covid-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    CovidComponent
  ],
  imports: [
    CommonModule,
    CovidRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ]
})
export class CovidModule { }
