import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as jalaliMoment from 'jalali-moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Action } from '../models/Action';
import { Contract } from '../models/Contract';
import { Industry } from '../models/Industry';
import { Personel } from '../models/Personel';
import { Task } from '../models/Task';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { ActionService } from '../services/action_service';
import { ContractService } from '../services/contract_service';
import { IndustryService } from '../services/industry_service';
import { ReportService } from '../services/report_service';
import { TaskService } from '../services/task_service';
import { VM_Salon_Line } from '../vm-models/vm-salon-line';
import { VM_Action_Line } from '../vm-models/vm_action_line';
import { VM_Action_Line_Contract } from '../vm-models/vm_action_line_contract';

@Component({
  selector: 'app-rep-general-activity',
  templateUrl: './rep-general-activity.component.html',
  styleUrls: ['./rep-general-activity.component.css']
})
export class RepGeneralActivityComponent implements OnInit {

  constructor(private contract_service: ContractService,
    private report_service: ReportService,
    private general_func: GeneralFunc,
    private action_service: ActionService,
    private industry_service: IndustryService,
    private task_service: TaskService,
  ) { }

  visible_progress: boolean;

  //contract
  contract_control = new FormControl();
  filtered_contract: Observable<Contract[]>;
  res_contracts: Contract[];

  //task
  task_control = new FormControl();
  filtered_task: Observable<Task[]>;
  res_tasks: Task[];


  to_action_start_date_selected: string;
  from_action_start_date_selected: string;


  res_personels: Personel[];
  res_salon_line: VM_Salon_Line[];
  disable_personel_list: boolean = true;
  model_action = new Action();
  options: any
  personels_selected: number;
  show_report: boolean = false;;

  vm_action_line = new VM_Action_Line();
  vm_action_line_contract = new VM_Action_Line_Contract();
  line_selected: number;
  res_industries: Industry[];

  get_industry_all() {
    this.visible_progress = true;
    return this.industry_service
      .get_industry_all()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_industries = data.Value;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;

        })

  }

  //Task-auto complete
  get_tasks_by_id_industry(id_industry) {
    this.visible_progress = true;
    return this.task_service
      .get_task_by_id_industry(id_industry)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_tasks = data.Value;
            this.filtered_task = this.task_control.valueChanges
              .pipe(
                startWith(''),
                map(x => x ? this.filter_tasks(x) : this.res_tasks.slice())
              );
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;

        })
  }
  display_selected_task_item(task: Task): string {
    return task && task.Title ? task.Title : '';
  }
  private filter_tasks(value: string): Task[] {
    return this.res_tasks.filter(x => x.Title.toLowerCase().includes(value));
  }
  //Contract-auto complete
  get_contracts_by_id_industry(id_industry) {
    this.visible_progress = true;
    return this.contract_service
      .get_contract_by_id_industry(id_industry)
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
  display_selected_contract_item(contract: Contract): string {
    return contract && contract.GenerateContractNumber ? contract.GenerateContractNumber : '';
  }

  private filter_contracts(value: string): Contract[] {
    return this.res_contracts.filter(x => x.GenerateContractNumber.toLowerCase().includes(value));
  }



  change_action_start_date(event: MatDatepickerInputEvent<jalaliMoment.Moment>) {

    const from_action_start_date = jalaliMoment.from(event.value.toString(), "en").utc(true).toJSON();
    this.from_action_start_date_selected = from_action_start_date;

  }
  change_to_action_start_date(event: MatDatepickerInputEvent<jalaliMoment.Moment>) {

    const to_action_start_date = jalaliMoment.from(event.value.toString(), "en").utc(true).toJSON();
    this.to_action_start_date_selected = to_action_start_date;
  }

  load_dependencies_by_industry(id_industry) {
    this.get_tasks_by_id_industry(id_industry);
    this.get_contracts_by_id_industry(id_industry);
  }

  ngOnInit() {
    this.get_industry_all();
  }

}
