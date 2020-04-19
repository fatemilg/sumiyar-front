import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { Observable } from 'rxjs';
import { VM_Contract_Action_Task } from '../vm-models/vm-contract-action-task';


@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/Report/';



  //reports
  get_activity_in_contract_by_personel(vm: VM_Contract_Action_Task): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'get_activity_in_contract_by_personel', vm)
  }

}

