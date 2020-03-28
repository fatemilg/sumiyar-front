import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { PageService } from '../services/page.service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { Page } from '../models/Page';
import { AccessLevelService } from '../services/access_level.service';

@Component({
  selector: 'app-menu',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(
    private token_service: TokenService,
    private router: Router,
    private access_level_service: AccessLevelService,
    private general_func: GeneralFunc
  ) { }
  visible_progress: boolean;
  res_access_pages: Page[];

  generate_pages_by_access_level(){
    this.visible_progress = true;
   
     let id_personel = this.token_service.getUserPayload().IDPersonel
    return this.access_level_service
      .generate_pages_by_access_level(id_personel)
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
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    this.generate_pages_by_access_level();
  }
}
