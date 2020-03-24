import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Contract } from '../models/Contract';
import { ContractService } from '../services/contract.service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { DefineTask } from '../models/DefineTask';
import { DefineTaskService } from '../services/define_task.service';
import { ContractTaskService } from '../services/contract_task_service';
import { ContractTask } from '../models/ContractTask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-contracts',
  templateUrl: './detail-contracts.component.html',
  styleUrls: ['./detail-contracts.component.css']
})
export class DetailContractsComponent implements OnInit {


  constructor(
    private contract_service: ContractService,
    private define_task_service: DefineTaskService,
    private contract_task_service: ContractTaskService,
    private general_func: GeneralFunc,
    private _bottomSheetRef: MatBottomSheetRef<DetailContractsComponent>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public pass_data: any
  ) { }

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
  model_detail_contract = new Contract()
  model_define_task = new DefineTask()
  res_define_tasks: DefineTask[];
  res_contract_tasks: ContractTask[];
  id_contract = this.pass_data.IDContract;
  visible_progress: boolean;

  get_detail_contract(id_contract) {
    this.visible_progress = true;
    return this.contract_service
      .get_detail_contract(id_contract)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.model_detail_contract = data.Value[0];
            this.get_define_task_by_define(data.Value[0].IDDefine)
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;
        })

  }
  get_define_task_by_define(id_define) {
    this.visible_progress = true;
    return this.define_task_service
      .get_define_task_by_define(id_define)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_define_tasks = data.Value;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;
        })
  }

  update_selected_define_task(id_define_task, selected) {
    this.model_define_task.IDDefineTask = id_define_task;
    this.model_define_task.Selected = selected

    return this.define_task_service
      .update_selected_define_task(this.model_define_task)
      .subscribe((data: XResult) => {
        if (!data.IsOK) {
          this.general_func.ShowMessage(data.Message, data.IsOK);

        }
      });
  }

  assign_contract_task() {
    let item = new ContractTask();
    item.IDContract = this.id_contract
    let selected_tasks = new Array();
    this.res_define_tasks.forEach(function (values) {
      if (values.Selected) {
        selected_tasks.push(values.IDTask)
      }
    });
    item.SelectedTasks = selected_tasks
    var xx= this.res_contract_tasks;
    return this.contract_task_service
      .assign_contract_task(item)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_contract_tasks = data.Value;
            this.cdr.detectChanges();
          }
          this.general_func.ShowMessage(data.Message, data.IsOK);

        })
  }

  get_contract_task_by_id_contract(id_contract) {
    this.visible_progress = true;
    return this.contract_task_service
      .get_contract_task_by_id_contract(id_contract)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_contract_tasks = data.Value;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;
        })
  }

  ngOnInit() {
    this.get_detail_contract(this.id_contract);
    this.get_contract_task_by_id_contract(this.id_contract);
  }

}
