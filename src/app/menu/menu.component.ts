import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogUserService } from '../services/log_user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private log_user: LogUserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  log_out() {
    this.log_user.remove_token();
    this.router.navigate(["login"]);
  }
}
