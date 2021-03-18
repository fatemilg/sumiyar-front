import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { Action } from '../models/Action';
import { Observable } from 'rxjs';
import { VM_Contract_Action_Task } from '../vm-models/vm-contract-action-task';


@Injectable({
  providedIn: 'root'
})

export class ActionService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/Action/';


  get_last_action_by_personel(id_personel: number) {
    return this.http.get<XResult>(this.base_url + 'get_last_action_by_personel/' + id_personel)
  }
  get_last_finished_action_by_personel(id_personel: number) {
    return this.http.get<XResult>(this.base_url + 'get_last_finished_action_by_personel/' + id_personel)
  }
  get_all_actions_by_personel(id_personel: number) {
    return this.http.get<XResult>(this.base_url + 'get_all_actions_by_personel/' + id_personel)
  }
  get_personles_worked_in_contract(id_contract: number) {
    return this.http.get<XResult>(this.base_url + 'get_personles_worked_in_contract/' + id_contract)
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
  get_detail_action(id_action: number) {
    return this.http.get<XResult>(this.base_url + 'get_detail_action/' + id_action)
  }


}

