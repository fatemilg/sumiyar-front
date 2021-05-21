import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { Action } from '../models/Action';
import { Observable } from 'rxjs';
import { VM_Action_Line } from '../vm-models/vm_action_line';



@Injectable({
  providedIn: 'root'
})

export class ActionService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/Action/';

  get_action_by_id_action(id_action: string) {
    return this.http.get<XResult>(this.base_url + 'get_action_by_id_action/' + id_action)
  }


  get_salon_line_used_in_action_by_start_date(action_start_date: string) {
    return this.http.get<XResult>(this.base_url + 'get_salon_line_used_in_action_by_start_date/' + action_start_date)
  }

  get_last_action_by_personel(id_personel: number) {
    return this.http.get<XResult>(this.base_url + 'get_last_action_by_personel/' + id_personel)
  }
  get_last_finished_action_by_personel(id_personel: number) {
    return this.http.get<XResult>(this.base_url + 'get_last_finished_action_by_personel/' + id_personel)
  }
  get_all_actions_by_personel(id_personel: number) {
    return this.http.get<XResult>(this.base_url + 'get_all_actions_by_personel/' + id_personel)
  }

  start_action(action: Action): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'start_action', action)
  }
  end_action(action: Action): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'end_action', action)
  }
  refuse_action(action: Action): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'refuse_action', action)
  }

  update_action(action: Action): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'update_action', action)
  }

  get_detail_action(id_action: number) {
    return this.http.get<XResult>(this.base_url + 'get_detail_action/' + id_action)
  }
  get_contracts_used_in_action_by_start_date_and_line(action_line: VM_Action_Line): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'get_contracts_used_in_action_by_start_date_and_line', action_line)
  }
  get_personel_worked_by_contract_and_line_and_action_strat_date(action_line: VM_Action_Line): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'get_personel_worked_by_contract_and_line_and_action_strat_date', action_line)
  }

}

