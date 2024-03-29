import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
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
import { PersonelService } from '../services/personel_service';
import { ReportService } from '../services/report_service';
import { SalonService } from '../services/salon_service';
import { TaskService } from '../services/task_service';
import { VM_Action_Detail } from '../vm-models/vm-action-detail';
import { VM_Contract_Action_Task } from '../vm-models/vm-contract-action-task';
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
    private salon_service: SalonService,
    private personel_service: PersonelService,
  ) { }

  visible_progress: boolean;



  //task
  task_control = new FormControl();
  filtered_task: Observable<Task[]>;
  res_tasks: Task[];


  //personel
  person_control = new FormControl();
  filtered_person: Observable<Personel[]>;
  res_personels: Personel[];

  to_action_start_date_selected: string;
  from_action_start_date_selected: string;


  res_salon_line: VM_Salon_Line[];

  model_action = new Action();
  options: any

  vm_action_line = new VM_Action_Line();
  vm_action_line_contract = new VM_Action_Line_Contract();
  line_selected: number;
  res_industries: Industry[];
  industry_selected: number;
  
  //table-config
  displayed_columns: string[] = ['ActionStartDate','ContractOrderNumber','FullName','ContractCount','TaskTitle', 'SalonLineTitle','ActivityCoutn', 'CalculateDoneWorkTime', 'CalculateExpectationSystemTime', 'Status'];
  data_source: MatTableDataSource<VM_Action_Detail>;

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


  //Person-auto complete
  get_personel_role_all() {
    this.visible_progress = true;
    return this.personel_service
      .get_personel_role_all()
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_personels = data.Value;
          this.filtered_person = this.person_control.valueChanges
            .pipe(
              startWith(''),
              map(x => x ? this.filter_personels(x) : this.res_personels.slice())
            );
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;

      })
  }
  display_selected_person_item(personel: Personel): string {
    return personel && personel.FullNameByRole ? personel.FullNameByRole : '';
  }

  private filter_personels(value: string): Personel[] {
    return this.res_personels.filter(x => x.FullNameByRole.toLowerCase().includes(value));
  }



  //salon
  get_salon_line_all() {
    this.visible_progress = true;
    return this.salon_service
      .get_salon_line_all()
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_salon_line = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;

      })
  }
  select_line(id_line: number) {
    this.line_selected=id_line;
  }


  change_from_action_start_date(event: MatDatepickerInputEvent<jalaliMoment.Moment>) {

    const from_action_start_date = jalaliMoment.from(event.value.toString(), "en").utc(true).toJSON();
    this.from_action_start_date_selected = from_action_start_date;

  }
  change_to_action_start_date(event: MatDatepickerInputEvent<jalaliMoment.Moment>) {

    const to_action_start_date = jalaliMoment.from(event.value.toString(), "en").utc(true).toJSON();
    this.to_action_start_date_selected = to_action_start_date;
  }

  load_dependencies_by_industry(id_industry) {
    this.get_tasks_by_id_industry(id_industry);
    this.industry_selected =id_industry
  }

  search() {
    this.visible_progress = true;
    let model = new VM_Contract_Action_Task()
    model.IDPersonel = this.person_control.value != null ?this.person_control.value.IDPersonel :0;
    model.IDTask = this.task_control.value!= null ?this.task_control.value.IDTask :0;
    model.IDLine = this.line_selected;
    model.IDIndustry = this.industry_selected;
    model.FromActionStartDate = this.from_action_start_date_selected;
    model.ToActionStartDate = this.to_action_start_date_selected;
    return this.report_service
      .get_general_report_activity(model)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.data_source = new MatTableDataSource(data.Value);
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      });
  }

  ngOnInit() {
    this.get_industry_all();
    this.get_salon_line_all();
    this.get_personel_role_all();
  }

}
