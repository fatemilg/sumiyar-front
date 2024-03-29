import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDatepickerInputEvent } from '@angular/material';
import * as jalaliMoment from 'jalali-moment';
import { Contract } from '../models/Contract';
import { Industry } from '../models/Industry';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { ContractService } from '../services/contract_service';
import { IndustryService } from '../services/industry_service';
import { TokenService } from '../services/token_service';

@Component({
  selector: 'app-add-contracts',
  templateUrl: './add-contracts.component.html',
  styleUrls: ['./add-contracts.component.css']
})
export class AddContractsComponent implements OnInit {
  OrderCompleteDateString: string;
  model_contract = new Contract();
  res_industries: Industry[];
  visible_progress: boolean;
  id_personel: number = this.token_service.getUserPayload().IDPersonel;


  //table-config
  displayed_columns: string[] = ['Actions','ContractNumber', 'OrderNumber', 'Count', 'Meter' ];
  data_source: MatTableDataSource<Contract>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  
  constructor(private contract_service: ContractService,
    private general_func: GeneralFunc,
    private industry_service: IndustryService,
    private token_service: TokenService
  ) { }


  add_update_contract(item :Contract) {
     item.IDPersonel=this.id_personel;
    this.visible_progress = true;
    return this.contract_service
      .add_update_contract(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.clear_form_contract();
          this.get_contracts_all();
        }
        this.general_func.ShowMessage(data.Message, data.IsOK);
        this.visible_progress = false;
      });
  }

  clear_form_contract() {
    this.model_contract =new Contract ();
    document.getElementById("btn_add_update_contract").innerHTML="ثبت";
    this.model_contract.IDIndustry = this.res_industries[0].IDIndustry;
  }

  get_contracts_all() {
    this.visible_progress = true;
    return this.contract_service
      .get_contracts_all()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.data_source = new MatTableDataSource(data.Value);
            this.data_source.paginator = this.paginator;
            this.data_source.sort = this.sort;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;

        })
  }

  edit_contract(id_contract) {
    this.visible_progress = true;

    document.getElementById("contract_container").scrollIntoView({ behavior: 'smooth' });
    document.getElementById("btn_add_update_contract").innerHTML=   "ویرایش";

    return this.contract_service
      .edit_contract(id_contract)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.model_contract = data.Value
          this.model_contract.OrderCompleteDateString = data.Value.OrderCompleteDate
        }
        else{
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;

      });
  }

  apply_filter(filter_value: string) {
    filter_value = filter_value.trim(); // Remove whitespace
    filter_value = filter_value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data_source.filter = filter_value;
  }

  get_industry_all() {
    return this.industry_service
      .get_industry_all()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_industries = data.Value;
            this.model_contract.IDIndustry = this.res_industries[0].IDIndustry;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }

        })

  }
  ngOnInit() {
    this.get_industry_all();
    this.get_contracts_all();
  }


  onChange(event: MatDatepickerInputEvent<jalaliMoment.Moment>) {
    // this.OrderCompleteDateString = jalaliMoment(event.value).format("jYYYY/jMM/jDD");
    // const date = jalaliMoment.from(event.value.toString(), "en").utc(true).toJSON();
    // console.log(`date: ${date}`);
    this.model_contract.OrderCompleteDateString = jalaliMoment.from(event.value.toString(), "en").utc(true).toJSON();
  }

}
