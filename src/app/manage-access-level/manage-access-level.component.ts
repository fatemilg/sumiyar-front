import { Component, OnInit } from '@angular/core';
import { PersonelService } from '../services/personel.service';
import { GeneralFunc } from '../scripts/general_func';
import { Personel } from '../models/Personel';
import { XResult } from '../models/Xresult';
import { AccessLevel } from '../models/AccessLevel';
import { AccessLevelService } from '../services/access_level.service';

@Component({
  selector: 'app-manage-access-level',
  templateUrl: './manage-access-level.component.html',
  styleUrls: ['./manage-access-level.component.css']
})
export class ManageAccessLevelComponent implements OnInit {

  constructor(
    private personel_service: PersonelService,
    private access_level_service: AccessLevelService,
    private general_func: GeneralFunc) { }


  res_personels: Personel[];
  res_access_level: AccessLevel[];
  show_menu_lists: boolean = false;
  model_access_level = new AccessLevel()
  visible_progress: boolean;


  get_personel_all() {
    this.visible_progress = true;

    return this.personel_service
      .get_personel_all()
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_personels = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;

      })
  }
  update_access(id_access_level,access) {
    this.model_access_level.IDAccessLevel = id_access_level;
    this.model_access_level.Access = access

    return this.access_level_service
      .update_access(this.model_access_level)
      .subscribe((data: XResult) => {
        if (!data.IsOK) {
          this.general_func.ShowMessage(data.Message, data.IsOK);

        }
      });
  }
  add_all_pages_for_personel(id_personel) {

    this.model_access_level.IDPersonel = id_personel
    return this.access_level_service
      .add_all_pages_for_personel(this.model_access_level)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.get_access_level_by_personel(id_personel);
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }

      });
  }
  get_access_level_by_personel(id_personel) {
    return this.access_level_service
      .get_access_level_by_personel(id_personel)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_access_level = data.Value;
            this.show_menu_lists = true;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
            this.show_menu_lists = false;

          }
        })
  }
  hide_Page_list() {
    this.show_menu_lists = false;
  }

  ngOnInit() {
    this.get_personel_all();
  }



}
