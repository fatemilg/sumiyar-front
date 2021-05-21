import { Component, OnInit } from '@angular/core';
import { Personel } from '../models/Personel';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { TokenService } from '../services/token_service';
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { LogUserService } from '../services/log_user_service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private general_func: GeneralFunc,
    private token_service: TokenService,
    private router: Router,
    private cookie: CookieService,
    private log_user_service: LogUserService

  ) { }


  model_login = new Personel();
  visible_progress: boolean;
  auth_user_cookie = this.cookie.get('auth_user')

  get_id_personel_in_log_user_by_token(token_log_user) {
    return this.log_user_service
      .get_id_personel_in_log_user_by_token(token_log_user)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.model_login.UserName = data.Value[0].UserName;
          this.model_login.Password = data.Value[0].Password;

        }
      });
  }

  generate_token(item) {
    this.visible_progress = true;
    return this.token_service
      .generate_token(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.token_service.set_token(data.Value.TokenJWT);
          this.router.navigate(["action"]);
          this.cookie.set('auth_user', data.Value.TokenLogUser, 1); //24h
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);

        }
        this.visible_progress = false;
      });
  }

  ngOnInit() {
    if (this.auth_user_cookie)
      this.get_id_personel_in_log_user_by_token(this.auth_user_cookie)
  }



}
