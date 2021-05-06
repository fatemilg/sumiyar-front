import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionService } from '../services/action_service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { MatTableDataSource } from '@angular/material';
import { Action } from '../models/Action';
import { VM_Action_List_By_Id } from '../vm-models/vm-action-list-by-id';
import { ContractService } from '../services/contract_service';
import { TaskCategoryService } from '../services/task_category_service';
import { TaskService } from '../services/task_service';
import { TokenService } from '../services/token_service';
import { SalonService } from '../services/salon_service';
import { LineService } from '../services/line_service';
import { Contract } from '../models/Contract';
import { TaskCategory } from '../models/TaskCategory';
import { Task } from '../models/Task';
import { Salon } from '../models/Salon';
import { Line } from '../models/Line';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-manage-actions',
  templateUrl: './manage-actions.component.html',
  styleUrls: ['./manage-actions.component.css']
})
export class ManageActionsComponent implements OnInit {


  model_action = new Action()
  visible_progress: boolean;
  show_edit_panel: boolean = false;

  res_contracts: Contract[];
  res_task_categories: TaskCategory[];
  res_tasks: Task[];
  res_salons: Salon[];
  res_lines: Line[];
  contract_control = new FormControl();
  filtered_contract: Observable<Contract[]>;
  id_industry: number = 1;

  //table-config
  displayed_columns: string[] = ['Actions', 'PersonTitle', 'StartDateAction', 'Status'];
  data_source: MatTableDataSource<VM_Action_List_By_Id>;

  constructor(private action_service: ActionService,
    private contract_service: ContractService,
    private task_category_service: TaskCategoryService,
    private task_service: TaskService,
    private salon_service: SalonService,
    private line_service: LineService,
    private general_func: GeneralFunc
  ) {

  }


  get_action_by_id_action(filter_value: string) {
    this.show_edit_panel = false;
    filter_value = filter_value.trim().toLowerCase(); // Remove whitespace
    if (filter_value != '') {
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
    else {
      this.data_source = null;
    }

  }

  edit_action(element: VM_Action_List_By_Id) {
    this.show_edit_panel = true;
    this.get_salons_all();
    this.get_contracts_is_started_and_not_end();
    this.get_task_category_by_industry(this.id_industry);

    this.model_action.IDAction = element.IDAction
    this.model_action.IDTaskCategory = element.IDTaskCategory
    this.model_action.IDSalon = element.IDSalon
    this.model_action.IDTask = element.IDTask;
    this.model_action.IDLine = element.IDLine;
    this.model_action.Count = element.Count;
    this.model_action.CalculateDoneWorkTime = element.CalculateDoneWorkTime;
    this.model_action.CalculateExpectationSystemTime = element.CalculateExpectationSystemTime;

    this.get_task_by_task_category(element.IDTaskCategory);
    this.get_line_by_salon(element.IDSalon);

    this.contract_control.setValue({
      item: element.IDContract,
      GenerateContractNumber: element.GenerateContractNumber
    });



  }

  get_contracts_is_started_and_not_end() {
    this.visible_progress = true;
    return this.contract_service
      .get_contracts_is_started_and_not_end()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_contracts = data.Value;
            this.filtered_contract = this.contract_control.valueChanges
              .pipe(
                startWith(''),
                map(x => x ? this.filter_contracts(x) : this.res_contracts.slice())
              );

          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;

        })
  }
  get_salons_all() {
    this.visible_progress = true;
    return this.salon_service
      .get_salons_all()
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_salons = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  get_line_by_salon(id_salon) {
    this.visible_progress = true;
    return this.line_service
      .get_line_by_salon(id_salon)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_lines = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  get_task_category_by_industry(id_industry) {
    this.visible_progress = true;
    return this.task_category_service
      .get_task_category_by_industry(id_industry)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_task_categories = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  get_task_by_task_category(id_task_category) {
    this.visible_progress = true;
    return this.task_service
      .get_task_by_task_category(id_task_category)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_tasks = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  display_selected_contract_item(contract: Contract): string {
    return contract && contract.GenerateContractNumber ? contract.GenerateContractNumber : '';
  }

  private filter_contracts(value: string): Contract[] {
    return this.res_contracts.filter(x => x.GenerateContractNumber.toLowerCase().includes(value));
  }


  update_action(element :Action) {
    this.visible_progress = true;
    this.model_action.IDContract = this.contract_control.value != null ? this.contract_control.value.IDContract : 0;
    this.model_action.IDAction = element.IDAction
    this.model_action.IDTask = this.model_action.IDTask != undefined ? this.model_action.IDTask : 0;
    this.model_action.IDLine = this.model_action.IDLine != undefined ? this.model_action.IDLine : 0;
    return this.action_service
      .update_action(this.model_action)
      .subscribe((data: XResult) => {
        if(data.IsOK)
        {
          this. get_action_by_id_action(element.IDAction.toString());
        }
        this.general_func.ShowMessage(data.Message, data.IsOK);
        this.visible_progress = false;
      });
  }

  ngOnInit() {
  }

}
