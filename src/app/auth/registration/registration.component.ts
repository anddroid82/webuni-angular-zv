import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  regClicked = false;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(3)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    phone: new FormControl('', Validators.required),
    accept: new FormControl(false)
  });

  constructor(private authService: AuthService, private router: Router) {

  }

  get f(){
    return this.form.controls;
  }

  registration() {
    if (!this.regClicked) {
      /* azért van itt ez az egész if blokk, hogy a felhasználó tudjon kattintani a Regisztráció gombra első alkalommal az adatkezelés bejelölése nélkül is,
      majd beállítjuk kötelező true-nak és a hibaüzenetet megjelenítjük. Ezek után már csak az adatkezelés bejelölésével válik a Regisztráció gomb kattinthatóvá. */
      this.form.setControl('accept',new FormControl(this.form.value.accept,Validators.requiredTrue));
      if (!this.form.value.accept) {
        this.form.controls['accept'].setErrors({'incorrect':true});
      }
    }

    if (this.form.valid) {
      //mehet a regisztráció
      this.authService.setUsername(this.form.value.username);
      this.router.navigateByUrl('translate');
    }

    this.regClicked=true;
  }

}
