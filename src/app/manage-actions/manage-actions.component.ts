import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionService } from '../services/action_service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { MatTableDataSource } from '@angular/material';
import { Action } from '../models/Action';
import { VM_Action_List_By_Id } from '../vm-models/vm-action-list-by-id';

@Component({
  selector: 'app-manage-actions',
  templateUrl: './manage-actions.component.html',
  styleUrls: ['./manage-actions.component.css']
})
export class ManageActionsComponent implements OnInit {


  model_action = new Action()
  visible_progress: boolean;


  //table-config
  displayed_columns: string[] = ['Actions','PersonTitle','SalonTitle', 'GenerateContarctNumber'];
  data_source: MatTableDataSource<VM_Action_List_By_Id>;

  constructor(private personel_service: ActionService,
    private action_service: ActionService,
    private general_func: GeneralFunc
  ) { 
  }


  get_action_by_id_action(filter_value: string) {
    filter_value = filter_value.trim().toLowerCase(); // Remove whitespace
    if(filter_value!='')
    {
      this.visible_progress = true;
      return this.action_service
      .get_action_by_id_action(filter_value)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.data_source = new MatTableDataSource(data.Value);
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
    }

  }



  ngOnInit() {
  }

}
