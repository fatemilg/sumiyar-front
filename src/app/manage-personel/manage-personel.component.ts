import { Component, OnInit } from '@angular/core';
import { PersonelService } from '../services/personel.service';
import { Role } from '../models/Role';
import { RoleService } from '../services/role.service';
import { XResult } from '../models/Xresult';
import { Personel } from '../models/Personel';
import { GeneralFunc } from '../scripts/general_func';
import { MatTableDataSource } from '@angular/material';


 

@Component({
  selector: 'app-manage-personel',
  templateUrl: './manage-personel.component.html',
  styleUrls: ['./manage-personel.component.css']
})
export class ManagePersonelComponent implements OnInit {

  constructor(private personel_service: PersonelService,
    private role_service: RoleService,
    private general_func: GeneralFunc
  ) { 

  }




  res_roles: Role[];
  model_personel = new Personel()
  visible_progress: boolean;


  //table-config
  displayedColumns: string[] = ['Actions','FullName', 'UserName', 'Active'];
  dataSource: MatTableDataSource<Personel>;



  get_role_all() {
    return this.role_service
      .get_role_all()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_roles = data.Value;
            this.model_personel.IDRole = this.res_roles[0].IDRole;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }

        })
  }
  get_personel_all() {

    this.visible_progress = true;
    return this.personel_service
      .get_personel_all()
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.dataSource = new MatTableDataSource(data.Value);
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  add_update_personel(item) {
    return this.personel_service
      .add_update_personel(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.clear_form_personel();
          this.get_personel_all();
        }
        this.general_func.ShowMessage(data.Message, data.IsOK);

      });
  }

  clear_form_personel() {
    this.model_personel =new Personel();
    this.model_personel.IDRole = this.res_roles[0].IDRole;
    document.getElementById("btn_add_update_personel").innerHTML="ثبت";

  }

  update_active_status(id_personel, active_status) {
    let item = new Personel()
    item.IDPersonel = id_personel;
    item.Active = !active_status;
    return this.personel_service
      .update_active_status(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {

          this.get_personel_all();
        }
        else
        {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
      });
  }

  edit_personel(id_personel) {
    document.getElementById("personel_container").scrollIntoView({ behavior: 'smooth' });
    document.getElementById("btn_add_update_personel").innerHTML=   "ویرایش";

    return this.personel_service
      .edit_personel(id_personel)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.model_personel = data.Value
        }
        else{
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



  ngOnInit() {
    this.get_role_all();
    this.get_personel_all();

  }
  



}
