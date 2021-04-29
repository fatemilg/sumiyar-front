import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { GeneralFunc } from '../scripts/general_func';
import { ActionService } from '../services/action_service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { XResult } from '../models/Xresult';
import { Action } from '../models/Action';
import { VM_Action_Detail } from '../vm-models/vm-action-detail';

@Component({
  selector: 'app-detail-action',
  templateUrl: './detail-action.component.html',
  styleUrls: ['./detail-action.component.css']
})
export class DetailActionComponent implements OnInit {

  visible_progress: boolean;
  id_action = this.pass_data.IDAction;
  model_detail_action = new VM_Action_Detail()

  constructor(
    private action_service: ActionService,
    private general_func: GeneralFunc,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public pass_data: any
  ) { }

  get_detail_action(id_action) {
    this.visible_progress = true;
    return this.action_service
      .get_detail_action(id_action)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
         
            this.model_detail_action = data.Value[0];
            this.visible_progress = false;
            this.cdr.detectChanges();
      

          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;
        })
  }


  ngOnInit() {
    this.get_detail_action(this.id_action);
  }

}
