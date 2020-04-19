import { Component, OnInit } from '@angular/core';
import { GeneralFunc } from '../scripts/general_func';
import { ActionService } from '../services/action_service';
import { Action } from '../models/Action';
import { ContractService } from '../services/contract_service';
import { XResult } from '../models/Xresult';
import { Contract } from '../models/Contract';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Task } from '../models/Task';
import { TokenService } from '../services/token_service';
import { TaskCategoryService } from '../services/task_category_service';
import { TaskCategory } from '../models/TaskCategory';
import { TaskService } from '../services/task_service';



@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private action_service: ActionService,
    private contract_service: ContractService,
    private task_category_service: TaskCategoryService,
    private task_service: TaskService,
    private token_service: TokenService,
    private general_func: GeneralFunc) {
  }
  model_action = new Action()

  res_contracts: Contract[];
  res_task_categories: TaskCategory[];
  res_tasks: Task[];
  res_last_action_personel: Action;

  visible_task_category_list: boolean = false;
  visible_task_list: boolean = false;
  visible_other_elements: boolean = false;
  is_finish_last_action: boolean = false;
  visible_progress: boolean;

  id_personel: number = this.token_service.getUserPayload().IDPersonel;
  id_last_action_by_personel: number;
  contract_control = new FormControl();
  filtered_contract: Observable<Contract[]>;
  passed_time: string;

  get_last_action_by_personel(id_personel) {
    this.visible_progress = true;
    return this.action_service
      .get_last_action_by_personel(id_personel)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_last_action_personel = data.Value;
            this.id_last_action_by_personel = data.Value.IDAction
            if (this.res_last_action_personel.EndDate == null) // iani akharin action hanooz baz hast va be payan nareside
            {
              this.is_finish_last_action = false;
              this.passed_time = data.Value.PassedTime;
            }
            else {
              this.is_finish_last_action = true;
            }
          }
          else {
            this.is_finish_last_action = true; // avalin bar ke hanooz personel actioni vared nakarde
          }
          this.visible_progress = false;

        })
  }



  get_contracts_in_line() {
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

  auto_contracts_select_change(evt: any) {
    if (evt.source.selected) {
      this.visible_task_category_list = true;
      this.get_task_category_by_industry(evt.source.value.IDIndustry);
    }
    else {
      this.visible_task_category_list = false;
    }
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
          this.visible_task_list = false;
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
          this.visible_task_list = true;
          this.visible_other_elements = false;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  select_task_item() {
    this.visible_other_elements = true;
  }



  display_selected_contract_item(contract: Contract): string {
    return contract && contract.GenerateContarctNumber ? contract.GenerateContarctNumber : '';
  }

  private filter_contracts(value: string): Contract[] {
    return this.res_contracts.filter(x => x.GenerateContarctNumber.toLowerCase().includes(value));
  }





  start_action() {
    let c = confirm("آیا مطمئن هستید ?");
    if (c) {
      this.visible_progress = true;
      let item = new Action()
      item.IDPersonel = this.id_personel;

      return this.action_service
        .start_action(item)
        .subscribe((data: XResult) => {
          if (data.IsOK) {
            this.token_service.remove_token();
          }
          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_progress = false;
        });
    }
    else
      this.visible_progress = false;
  }

  end_action() {
    let c = confirm("آیا مطمئن هستید ?");
    if (c) {
      this.visible_progress = true;
      this.model_action.IDContract = this.contract_control.value.IDContract;
      this.model_action.IDAction = this.id_last_action_by_personel;
      return this.action_service
        .end_action(this.model_action)
        .subscribe((data: XResult) => {
          if (data.IsOK) {
            this.is_finish_last_action = true;
          }
          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_progress = false;
        });
    }
    else
      this.visible_progress = false;
  }

  refuse_action() {
    let c = confirm("آیا مطمئن هستید ?");
    if (c) {
      this.visible_progress = true;
      let item = new Action()
      item.IDAction = this.id_last_action_by_personel;
      return this.action_service
        .refuse_action(item)
        .subscribe((data: XResult) => {
          if (data.IsOK) {
            this.is_finish_last_action = true;
          }
          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_progress = false;
        });
    }
    else
      this.visible_progress = false;
  }

  ngOnInit() {
    this.get_last_action_by_personel(this.id_personel)
    this.get_contracts_in_line();
  }

}
