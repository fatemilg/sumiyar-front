import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private token_service: TokenService) { }

  check_is_login() {
    if (this.token_service.is_authenticated())
      return true;
    else
      return false;
  }
  ngOnInit() {

  }

}
