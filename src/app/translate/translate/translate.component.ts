import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';
import { Language } from '../model/language.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  languages: Language[] = [];
  form: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(3)]),
    source: new FormControl('', [Validators.required, Validators.pattern('[a-z]{2}')]),
    target: new FormControl('', Validators.required)
  });
  translatedText: string = ''

  loggedIn: boolean = false;
  translateLeft: number = 0;

  constructor(private translateService: TranslateService, private authService: AuthService, private snackBar:MatSnackBar) {
    this.loggedIn = this.authService.isLoggedIn();
    this.translateLeft = this.translateService.getNumberOfTranslateLeft();
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.translateService.getLanguages().subscribe(d => {
      this.languages = d.data.languages;
    });
  }

  translate() {
    if (this.form.valid && (this.loggedIn || this.translateLeft > 0)) {
      this.translateService.translate(this.form.value.text, this.form.value.source, this.form.value.target).pipe(
        catchError(error => {
          this.snackBar.open(error.error.error.message,'OK',{duration: 5000});
          return of([])
        })
      )
        .subscribe(d => {
          if (d.data) {
            this.translatedText = d.data.translations[0].translatedText;
            this.translateService.incrementNumberOfTranslates();
            this.translateLeft = this.translateService.getNumberOfTranslateLeft();
          }
        })
    }
  }

  detectSource() {
    this.translateService.detectLanguage(this.form.value.text).subscribe(d => {
      this.form.patchValue({ source: d.data.detections[0][0].language });
      this.translate();
    })
  }

  




}
