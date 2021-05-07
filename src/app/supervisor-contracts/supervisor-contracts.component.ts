import { Component, OnInit, ViewChild } from '@angular/core';
import { XResult } from '../models/Xresult';
import { Contract } from '../models/Contract';
import { GeneralFunc } from '../scripts/general_func';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { TokenService } from '../services/token_service';
import { SupervisorContractService } from '../services/supervisor_contract_service';
import { ContractService } from '../services/contract_service';


@Component({
  selector: 'app-supervisor-contracts',
  templateUrl: './supervisor-contracts.component.html',
  styleUrls: ['./supervisor-contracts.component.css']
})
export class SupervisorContractsComponent implements OnInit {

  constructor(private supervisor_contract_service: SupervisorContractService,
    private contract_service: ContractService,
    private general_func: GeneralFunc,
    private token_service: TokenService
  ) { }


  //table-config
  displayed_columns: string[] = ['ContractNumber', 'OrderNumber', 'Count', 'Meter', 'StartContract', 'EndContract'];
  data_source: MatTableDataSource<Contract>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  login_user = this.token_service.getUserPayload()
  model_contract = new Contract();
  visible_progress: boolean;

  get_contracts_by_supervisor(id_personel) {
    this.visible_progress = true;
    return this.supervisor_contract_service
      .get_contracts_by_supervisor(id_personel)
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

  apply_filter(filter_value: string) {
    filter_value = filter_value.trim(); // Remove whitespace
    filter_value = filter_value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data_source.filter = filter_value;
  }

  update_start_date(id_contract) {
    this.visible_progress = true;
    this.model_contract.IDContract = id_contract;
    return this.contract_service
      .update_start_date(this.model_contract)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.get_contracts_by_supervisor(this.login_user.IDPersonel);
          }
          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_progress = false;
        })
  }
  update_end_date(id_contract) {
    this.visible_progress = true;
    this.model_contract.IDContract = id_contract;
    return this.contract_service
      .update_end_date(this.model_contract)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.get_contracts_by_supervisor(this.login_user.IDPersonel);
          }
          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_progress = false;
        })
  }

  ngOnInit() {
    this.get_contracts_by_supervisor(this.login_user.IDPersonel);
  }

}
