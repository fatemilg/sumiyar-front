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

  get_contracts_all() {
    return this.http.get<XResult>(this.base_url + 'get_contracts_all')
  }
  
  get_contracts_is_started_and_not_end() {
    return this.http.get<XResult>(this.base_url + 'get_contracts_is_started_and_not_end')
  }
  get_contracts_just_is_started() {
    return this.http.get<XResult>(this.base_url + 'get_contracts_just_is_started')
  }

  get_detail_contract(id_contract: number) {
    return this.http.get<XResult>(this.base_url + 'get_detail_contract/' + id_contract)
  }

  update_start_date(contract: Contract): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'update_start_date', contract)
  }
  update_end_date(contract: Contract): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'update_end_date', contract)
  }



}

