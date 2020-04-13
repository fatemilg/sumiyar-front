import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token_service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { Page } from '../models/Page';
import { AccessLevelService } from '../services/access_level_service';

@Component({
  selector: 'app-menu',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(
    private token_service: TokenService,
    private access_level_service: AccessLevelService,
    private general_func: GeneralFunc
  ) { }
  visible_progress: boolean;
  res_access_pages: Page[];
  login_user = this.token_service.getUserPayload()
  

  generate_pages_by_access_level(){
    this.visible_progress = true;
    return this.access_level_service
      .generate_pages_by_access_level(this.login_user.IDPersonel)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_access_pages = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  log_out() {
    this.token_service.remove_token();
  }

  ngOnInit() {
    this.generate_pages_by_access_level();

  }
}
