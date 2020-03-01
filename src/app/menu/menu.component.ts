import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { Router } from '@angular/router';
import { LogUserService } from '../services/log_user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private log_user_service :LogUserService,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  log_out() {
    this.cookie.delete('Token', '/path');
    this.router.navigateByUrl('/login')

  }
}
