import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Contract } from '../models/Contract';
import { ContractService } from '../services/contract.service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';

@Component({
  selector: 'app-detail-contracts',
  templateUrl: './detail-contracts.component.html',
  styleUrls: ['./detail-contracts.component.css']
})
export class DetailContractsComponent implements OnInit {


  constructor(
    private contract_service:ContractService,
    private general_func: GeneralFunc,
    private _bottomSheetRef: MatBottomSheetRef<DetailContractsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public pass_data: any
  ) { }

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
  model_detail_contract = new Contract()

  load_detail_contract() {
    var id_contract = this.pass_data.IDContract;
    return this.contract_service
    .get_detail_contract(id_contract)
    .subscribe(
      (data: XResult) => {
        if (data.IsOK) {

        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }

      })

  }

  ngOnInit() {
    this.load_detail_contract();
  }

}
