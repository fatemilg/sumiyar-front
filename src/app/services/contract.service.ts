import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { Observable } from 'rxjs';
import { Contract } from '../models/Contract';

@Injectable({
  providedIn: 'root'
})

export class ContractService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/Contract/';

  get_contract_all() {
    return this.http.get<XResult>(this.base_url + 'get_contract_all')
  }
  get_detail_contract(Id: number) {
    return this.http.get<XResult>(this.base_url + 'get_detail_contract/' + Id)
  }

  update_start_status(contract: Contract): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'update_start_status', contract)
  }

}

