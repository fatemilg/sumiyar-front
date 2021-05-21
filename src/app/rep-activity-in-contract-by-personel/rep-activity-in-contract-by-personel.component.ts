import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract_service';
import { XResult } from 'src/app/models/Xresult';
import { startWith, map } from 'rxjs/operators';
import { GeneralFunc } from 'src/app/scripts/general_func';
import { Personel } from 'src/app/models/Personel';
import { ActionService } from 'src/app/services/action_service';
import { Action } from 'src/app/models/Action';
import { VM_Contract_Action_Task } from 'src/app/vm-models/vm-contract-action-task';
import { ReportService } from 'src/app/services/report_service';
import { SupervisorContractService } from 'src/app/services/supervisor_contract_service';
import { SupervisorContract } from 'src/app/models/SupervisorContract';
import { MatDatepickerInputEvent, MatTableDataSource } from '@angular/material';
import * as jalaliMoment from 'jalali-moment';
import { VM_Salon_Line } from '../vm-models/vm-salon-line';
import { VM_Action_Line } from '../vm-models/vm_action_line';
import { VM_Action_Line_Contract } from '../vm-models/vm_action_line_contract';
import { VM_Action_Detail } from '../vm-models/vm-action-detail';

declare var require: any;
let Boost = require('node_modules/highcharts/modules/boost');
let noData = require('node_modules/highcharts/modules/no-data-to-display');
let More = require('node_modules/highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-rep-activity-in-contract-by-personel',
  templateUrl: './rep-activity-in-contract-by-personel.component.html',
  styleUrls: ['./rep-activity-in-contract-by-personel.component.css']
})
export class RepActivityInContractByPersonelComponent implements OnInit {

  constructor(private contract_service: ContractService,
    private report_service: ReportService,
    private general_func: GeneralFunc,
    private action_service: ActionService,
    private supervisor_contract_service: SupervisorContractService) { }


  contract_control = new FormControl();
  filtered_contract: Observable<Contract[]>;
  visible_progress: boolean;
  res_contracts: Contract[];
  res_personels: Personel[];
  res_salon_line: VM_Salon_Line[];
  disable_personel_list: boolean = true;
  model_action = new Action();
  options: any
  personels_selected: number;
  show_report: boolean = false;;
  action_start_date_selected: string;
  vm_action_line = new VM_Action_Line();
  vm_action_line_contract = new VM_Action_Line_Contract();
  line_selected :number;

    //table-config
    displayed_columns: string[] = ['TaskTitle', 'Count', 'CalculateDoneWorkTime','CalculateExpectationSystemTime','Status'];
    data_source: MatTableDataSource<VM_Action_Detail>;

  get_personel_worked_by_contract_and_line_and_action_strat_date(id_contract,id_line,action_start_date) {
    this.visible_progress = true;
    this.vm_action_line_contract.IDContract=id_contract;
    this.vm_action_line_contract.IDLine=id_line;
    this.vm_action_line_contract.ActionStartDateString=action_start_date;

    return this.action_service
      .get_personel_worked_by_contract_and_line_and_action_strat_date(this.vm_action_line_contract)
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


  get_contracts_used_in_action_by_start_date_and_line(action_start_date: string, id_line: number) {
    this.visible_progress = true;
    this.vm_action_line.IDLine=id_line;
    this.vm_action_line.ActionStartDateString=action_start_date;

    return this.action_service
      .get_contracts_used_in_action_by_start_date_and_line(this.vm_action_line)
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

  get_salon_line_used_in_action_by_start_date(action_start_date: string) {
    this.visible_progress = true;
    return this.action_service
      .get_salon_line_used_in_action_by_start_date(action_start_date)
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
    this.res_personels=null;
    this.contract_control.setValue('');
    this.get_contracts_used_in_action_by_start_date_and_line(this.action_start_date_selected, id_line);
  }


  display_selected_contract_item(contract: Contract): string {
    return contract && contract.GenerateContractNumber ? contract.GenerateContractNumber : '';
  }

  private filter_contracts(value: string): Contract[] {
    return this.res_contracts.filter(x => x.GenerateContractNumber.toLowerCase().includes(value));
  }


  auto_contracts_select_change(evt: any) {
    this.res_personels=null;
    if (evt.source.selected) {
      this.disable_personel_list = false;
      this.get_personel_worked_by_contract_and_line_and_action_strat_date(evt.source.value.IDContract,this.line_selected,this.action_start_date_selected)
      this.show_report = false;
    }
    else {
      this.disable_personel_list = true;
      this.show_report = true;
    }

  }


  select_personel() {
    this.visible_progress = true;
    this.show_report = true;

    let model = new VM_Contract_Action_Task()
    model.IDContract = this.contract_control.value.IDContract;
    model.IDPersonel = this.personels_selected;
    model.IDLine = this.line_selected;
    model.ActionStartDate = this.action_start_date_selected;

    return this.report_service
      .get_activity_in_contract_by_personel(model)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.load_report(data.Value);
          this. get_accumulative_activity_in_contract_by_personel(model)
        }
        else {
          this.show_report = false;
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      });
  }

  get_accumulative_activity_in_contract_by_personel(model:VM_Contract_Action_Task){
    this.visible_progress = true;
    return this.report_service
      .get_accumulative_activity_in_contract_by_personel(model)
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


  load_report(json) {

    this.options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'عملکرد ' + json[0].FullName,
        style: {
          fontFamily: 'IranSans'
        }
      },
      subtitle: {
        text: 'شماره سفارش : ' + json[0].Contract_Order_Number + ' / تعداد: ' + json[0].ContractCount + ' / متراژ: ' + json[0].ContractMeter,
        style: {
          fontFamily: 'IranSans',
        }
      },
      xAxis: {
        categories: this.create_json_for_chart(json).TaskTitle,
        crosshair: true,
        labels: {
          rotation: -45,
          style: {
            fontFamily: 'IranSans',
            fontSize: '12px'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'زمان انجام کار (s)',
          style: {
            fontFamily: 'IranSans',
            fontSize: '13px',
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px;font-family:IranSans;direction:rtl;">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0;font-family:IranSans">{series.name}: </td>' +
          '<td style="padding:0;"><b>{point.y:1f} (S)</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: json[0].FullName,
        data: this.create_json_for_chart(json).CompletePassedTime

      }, {
        name: 'سیستم',
        data: this.create_json_for_chart(json).SystemEstimateTime
      }]
    }

    Highcharts.chart('container', this.options);
  }


  create_json_for_chart(json): VM_Contract_Action_Task {
    let list_task_short_title: Array<string> = [];
    let list_duration_task_by_personel: Array<number> = [];
    let list_duration_task_by_system: Array<number> = [];

    let vm = new VM_Contract_Action_Task();
    json.forEach(function (item) {
      list_task_short_title.push(item.TaskTitle + '-' + item.ActivityCoutn)
      list_duration_task_by_personel.push(item.CompletePassedTime)
      list_duration_task_by_system.push(item.SystemEstimateTime)
    });
    vm.TaskTitle = list_task_short_title;
    vm.CompletePassedTime = list_duration_task_by_personel;
    vm.SystemEstimateTime = list_duration_task_by_system;
    return vm

  }

  change_action_start_date(event: MatDatepickerInputEvent<jalaliMoment.Moment>) {

    const action_start_date = jalaliMoment.from(event.value.toString(), "en").utc(true).toJSON();
    this.action_start_date_selected = action_start_date;
    this.line_selected=null;
    this.res_personels=null;
    this.contract_control.setValue('');
    this.get_salon_line_used_in_action_by_start_date(action_start_date)

  }
  ngOnInit() {

  }

}
