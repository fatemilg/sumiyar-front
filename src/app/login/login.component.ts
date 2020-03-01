import { Component, OnInit } from '@angular/core';
import { PersonelService } from '../services/personel.service'
import { Personel } from '../models/Personel';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { LogUserService } from '../services/log_user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private personel_service: PersonelService,
    private general_func: GeneralFunc,
    private log_user: LogUserService,
    private router: Router
  ) { }

  model_login = new Personel()

  check_personel_log_in(item) {
    return this.personel_service
      .check_personel_log_in(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.log_user.set_token(data.Value.Token);
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
