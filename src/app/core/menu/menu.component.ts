import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  username: string = '';
  isLoggedIn:boolean = false;

  constructor(private authService: AuthService, private router:Router) {

  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.authService.getUsernameSubject().subscribe( u => {
      this.username = u;
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logout(){
    this.authService.clearUsername();
    this.router.navigateByUrl('/registration');
  }

}
