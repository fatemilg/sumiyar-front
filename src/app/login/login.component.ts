import { Component, OnInit } from '@angular/core';
import { Personel } from '../models/Personel';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { TokenService } from '../services/token_service';
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
  visible_progress: boolean;
  

  generate_token(item) {
    this.visible_progress=true;
    return this.token_service
      .generate_token(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.token_service.set_token(data.Value);
          this.router.navigate(["action"]);
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);

        }
        this.visible_progress=false;
      });
  }

  ngOnInit() {
  }


}
