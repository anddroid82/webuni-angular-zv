import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateComponent } from './translate/translate.component';
import { TranslateRoutingModule } from './translate-routing.module';

@NgModule({
  declarations: [
    TranslateComponent
  ],
  imports: [
    CommonModule,
    TranslateRoutingModule
  ]
})
export class TranslateModule { }
