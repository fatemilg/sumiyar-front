import { Component, OnInit } from '@angular/core';
import { PersonelService } from '../services/personel_service';
import { GeneralFunc } from '../scripts/general_func';
import { Personel } from '../models/Personel';
import { XResult } from '../models/Xresult';
import { TokenService } from '../services/token_service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private personel_service: PersonelService,
    private general_func: GeneralFunc,
    private token_service: TokenService
  ) {
  }

  id_personel: number = this.token_service.getUserPayload().IDPersonel;
  model_personel = new Personel()
  visible_progress: boolean;

  update_password(item) {
    this.visible_progress = true;
    this.model_personel.Password =item.Password;
    this.model_personel.RepeatPassword =item.RepeatPassword;
    this.model_personel.IDPersonel=this.id_personel;
    return this.personel_service
      .update_password(this.model_personel)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.clear_form_change_password();
        }
        this.general_func.ShowMessage(data.Message, data.IsOK);
        this.visible_progress = false;
      });
  }


  clear_form_change_password() {
    this.model_personel = new Personel();
  }

  ngOnInit() {
  }

}
