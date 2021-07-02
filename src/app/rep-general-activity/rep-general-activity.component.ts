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


  //salon_line
  salon_line_control = new FormControl();
  filtered_salon_line: Observable<VM_Salon_Line[]>;
  res_salon_line: VM_Salon_Line[];

  to_action_start_date_selected: string;
  from_action_start_date_selected: string;
  model_action = new Action();
  options: any

  vm_action_line = new VM_Action_Line();
  vm_action_line_contract = new VM_Action_Line_Contract();

  res_industries: Industry[];
  industry_selected: number;

  distinct_person_list:any
  distinct_contract_list:any;
  distinct_task_list:any;
  sum_count:any;
  sum_time_diff_per_second:any;
  sum_expectation_system_time_per_second:any;

  visible_distinct:boolean =false;
  //table-config
  displayed_columns: string[] = ['ActionStartDate','ContractOrderNumber','FullName','ContractCount','TaskTitle', 'SalonLineTitle','ActivityCoutn', 'CalculateDoneWorkTime', 'CalculateExpectationSystemTime', 'EstimateOneUniTask','Status'];
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


  //salon-line-auto complete
  get_salon_lines() {
    this.visible_progress = true;
    return this.salon_service
      .get_salon_line_all()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_salon_line = data.Value;
            this.filtered_salon_line = this.salon_line_control.valueChanges
              .pipe(
                startWith(''),
                map(x => x ? this.filter_salon_line(x) : this.res_salon_line.slice())
              );
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;

        })
  }
  display_selected_salon_line_item(vm_salon_line: VM_Salon_Line): string {
    return vm_salon_line && vm_salon_line.Title ? vm_salon_line.Title : '';
  }
  private filter_salon_line(value: string): VM_Salon_Line[] {
    return this.res_salon_line.filter(x => x.Title.toLowerCase().includes(value));
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
    model.IDLine = this.salon_line_control.value!= null ?this.salon_line_control.value.IDLine :0;
    model.IDIndustry = this.industry_selected;
    model.FromActionStartDate = this.from_action_start_date_selected;
    model.ToActionStartDate = this.to_action_start_date_selected;
    return this.report_service
      .get_general_report_activity(model)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.data_source = new MatTableDataSource(data.Value);
         this.distinct_person_list = Array.from(new Set(data.Value.map(x => x.FullName)));
         this.distinct_contract_list = Array.from(new Set(data.Value.map(x => x.Contract_Order_Number)));
         this.distinct_task_list = Array.from(new Set(data.Value.map(x => x.TaskTitle)));
         this.sum_count = data.Value.reduce((sum, current) => sum + current.ActivityCoutn, 0);
         this.sum_time_diff_per_second= this.general_func.ConvertSecondsToRealTime(data.Value.reduce((sum, current) => sum + current.TimeDiffPerSecond, 0));
         this.sum_expectation_system_time_per_second=this.general_func.ConvertSecondsToRealTime(data.Value.reduce((sum, current) => sum + current.ExpectationSystemTimePerSecond, 0));
         this.visible_distinct=true;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_distinct=false;
        }
        this.visible_progress = false;
      });
  }



  ngOnInit() {
    this.get_industry_all();
    this.get_salon_lines();
    this.get_personel_role_all();
  }

}
