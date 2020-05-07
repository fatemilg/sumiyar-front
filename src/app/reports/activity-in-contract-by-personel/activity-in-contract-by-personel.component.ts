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

declare var require: any;
let Boost = require('node_modules/highcharts/modules/boost');
let noData = require('node_modules/highcharts/modules/no-data-to-display');
let More = require('node_modules/highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-activity-in-contract-by-personel',
  templateUrl: './activity-in-contract-by-personel.component.html',
  styleUrls: ['./activity-in-contract-by-personel.component.css']
})
export class ActivityInContractByPersonelComponent implements OnInit {

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
  disable_personel_list: boolean = true;
  model_action = new Action();
  options: any
  personels_selected: number;
  show_report: boolean = false;;



  get_personel_worked_in_contract(id_contract) {
    this.visible_progress = true;
    return this.action_service
      .get_personles_worked_in_contract(id_contract)
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



  get_contracts_just_is_started() {
    this.visible_progress = true;
    return this.contract_service
      .get_contracts_just_is_started()
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
    return contract && contract.GenerateContarctNumber ? contract.GenerateContarctNumber : '';
  }

  private filter_contracts(value: string): Contract[] {
    return this.res_contracts.filter(x => x.GenerateContarctNumber.toLowerCase().includes(value));
  }


  auto_contracts_select_change(evt: any) {
    if (evt.source.selected) {
      this.disable_personel_list = false;
      this.get_personel_worked_in_contract(evt.source.value.IDContract)
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

    return this.report_service
      .get_activity_in_contract_by_personel(model)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.load_report(data.Value);
        }
        else {
          this.show_report = false;
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



  ngOnInit() {
    this.get_contracts_just_is_started();


  }

}
