import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { Observable } from 'rxjs';
import { SupervisorContract } from '../models/SupervisorContract';

@Injectable({
  providedIn: 'root'
})

export class SupervisorContractService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/SupervisorContract/';

  get_contracts_by_supervisor(id_personel: number) {
    return this.http.get<XResult>(this.base_url + 'get_contracts_by_supervisor/'+ id_personel)
  }
  get_last_supervisor_by_contract(id_contract: number) {
    return this.http.get<XResult>(this.base_url + 'get_last_supervisor_by_contract/'+ id_contract)
  }
  get_all_supervisors_by_contract(id_contract: number) {
    return this.http.get<XResult>(this.base_url + 'get_all_supervisors_by_contract/'+ id_contract)
  }
  add_supervisor_contract(supervisor_contract: SupervisorContract): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'add_supervisor_contract', supervisor_contract)
  }


}

