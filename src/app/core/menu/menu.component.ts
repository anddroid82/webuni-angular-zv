import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  username: string|undefined;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

}
