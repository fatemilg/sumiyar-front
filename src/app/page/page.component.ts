import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(
    private token_service: TokenService,
    private router: Router,
  ) { }



  log_out() {
    this.token_service.remove_token();
    this.router.navigate(["login"]);
  }

  ngOnInit() {
  }
}
