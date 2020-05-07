import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { Observable } from 'rxjs';
import { ContractTask } from '../models/ContractTask';

@Injectable({
  providedIn: 'root'
})

export class ContractTaskService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/ContractTask/';


  get_contract_task_by_id_contract(id_contract:number) {
      return this.http.get<XResult>(this.base_url + 'get_contract_task_by_id_contract/' + id_contract)
  }


  assign_contract_task(contract_task: ContractTask): Observable<XResult> {
      return this.http.post<XResult>(this.base_url + 'assign_contract_task', contract_task)
  }

}

