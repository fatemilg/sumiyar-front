import { Component, OnInit } from '@angular/core';
import { PersonelService } from '../services/personel.service'
import { Personel } from '../models/Personel';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { CookieService } from 'ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private personel_service: PersonelService,
    private general_func: GeneralFunc,
    private cookie: CookieService,
    private router:Router) { }

  model_login = new Personel()
  ngOnInit() {
  }

  get_personel_login(item) {
    return this.personel_service
      .check_personel_log_in(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.cookie.set('Token', data.Value.Token,1,'/path');
          this.router.navigateByUrl('/dashboard');
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);

        }

      });
  }


}
