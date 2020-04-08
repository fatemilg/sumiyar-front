import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { XResult } from '../models/Xresult';
import { Contract } from '../models/Contract';
import { GeneralFunc } from '../scripts/general_func';
import { MatPaginator, MatTableDataSource, MatSort, MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { DetailContractsComponent } from '../detail-contracts/detail-contracts.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  constructor(private contract_service: ContractService,
    private general_func: GeneralFunc,
    private bottom_sheet: MatBottomSheet
  ) { }

  //table-config
  displayed_columns: string[] = [ 'ContarctNumber', 'OrderNumber', 'Count', 'Meter','Details'];
  data_source: MatTableDataSource<Contract>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  visible_progress: boolean;

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

  apply_filter(filter_value: string) {
    filter_value = filter_value.trim(); // Remove whitespace
    filter_value = filter_value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data_source.filter = filter_value;
  }
  load_detail_contract(id_contract): void {
    this.bottom_sheet.open(DetailContractsComponent, {
      data: { IDContract: id_contract }
      // disableClose :true

    });
  }


  ngOnInit() {
    this.get_contracts_all();
  }


}

