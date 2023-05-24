import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Language } from '../model/language.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  languages:Language[] = [];
  form:FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(3)]),
    source: new FormControl('', Validators.required),
    target: new FormControl('',Validators.required)
  });
  translatedText:string = ''

  constructor(private translateService: TranslateService) {

  }

  ngOnInit(): void {
    this.translateService.getLanguages().subscribe( d => {
      this.languages = d.data.languages;
    });
  }

  translate(){
    this.translateService.translate(this.form.value.text,this.form.value.source,this.form.value.target).subscribe(d => {
      //console.log(d);
      this.translatedText = d.data.translations[0].translatedText;
    })
  }


}
