import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Contract } from '../models/Contract';
import { ContractService } from '../services/contract_service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';
import { PersonelService } from '../services/personel_service';
import { Personel } from '../models/Personel';
import { SupervisorContractService } from '../services/supervisor_contract_service';
import { SupervisorContract } from '../models/SupervisorContract';


@Component({
  selector: 'app-detail-contracts',
  templateUrl: './detail-contracts.component.html',
  styleUrls: ['./detail-contracts.component.css']
})
export class DetailContractsComponent implements OnInit {


  constructor(
    private contract_service: ContractService,
    private supervisor_contract_service: SupervisorContractService,

    private personel_service: PersonelService,
    private general_func: GeneralFunc,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public pass_data: any
  ) { }

  model_detail_contract = new Contract()
  model_supervisor_contract = new SupervisorContract()
  model_personel = new Personel()
  id_contract = this.pass_data.IDContract;
  res_personel_supervisors: Personel[];
  is_disable_assign_supervisor: boolean = true;
  visible_progress: boolean;


  get_detail_contract(id_contract) {
    this.visible_progress = true;
    return this.contract_service
      .get_detail_contract(id_contract)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.model_detail_contract = data.Value[0];
            this.cdr.detectChanges();
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;
        })
  }


  get_personel_supervisor() {
    this.visible_progress = true;
    return this.personel_service
      .get_personel_supervisor()
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_personel_supervisors = data.Value;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }

  btn_enable_assign_supervisor() {
    this.is_disable_assign_supervisor = false;

  }

  assign_supervisor_contract() {
    this.visible_progress = true;
    this.model_supervisor_contract.IDContract = this.id_contract;
    this.model_supervisor_contract.IDPersonel = this.model_personel.IDPersonel
    return this.supervisor_contract_service
      .add_supervisor_contract(this.model_supervisor_contract)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.get_detail_contract(this.id_contract);
            this.get_supervisor_by_contract(this.id_contract);
           
          }

          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_progress = false;
          this.cdr.detectChanges();
        })
  }

  get_supervisor_by_contract(id_contract) {
    this.visible_progress = true;
    return this.supervisor_contract_service
      .get_supervisor_by_contract(id_contract)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            if (data.Value.length != 0) {
              this.model_supervisor_contract.AssignSupervisorDate = data.Value[0].AssignSupervisorDate;
              this.model_supervisor_contract.SupervisorFullName = data.Value[0].SupervisorFullName;
            }
            else {
              this.model_supervisor_contract.AssignSupervisorDate = null;
              this.model_supervisor_contract.SupervisorFullName = "";
            }
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;
          this.cdr.detectChanges();
        })
  }

  ngOnInit() {
    this.get_detail_contract(this.id_contract);
    this.get_personel_supervisor();
    this.get_supervisor_by_contract(this.id_contract);
  }

}
