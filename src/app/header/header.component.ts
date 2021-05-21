import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../services/token_service';
import { Claim } from '../models/Claim';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private token_service: TokenService) { }


  user_login: Claim;



  ngOnInit() {
    if (this.token_service.is_authenticated()) {
      this.user_login = this.token_service.getUserPayload();
    }
  }

}
