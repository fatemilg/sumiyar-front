import { Component, OnInit } from '@angular/core';
import { Personel } from '../models/Personel';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private general_func: GeneralFunc,
    private token_service: TokenService,
    private router: Router
  ) { }

  model_login = new Personel();

  

  generate_token(item) {
    return this.token_service
      .generate_token(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.token_service.set_token(data.Value);
          this.router.navigate(["dashboard"]);
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);

        }

      });
  }

  ngOnInit() {
  }


}
