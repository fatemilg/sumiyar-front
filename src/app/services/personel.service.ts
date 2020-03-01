import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Personel } from '../models/Personel'
import { EnvironmentUrlService } from './shared/environment-url.service';
import { Observable } from 'rxjs';
import { XResult } from '../models/Xresult';


@Injectable({
  providedIn: 'root'
})

export class PersonelService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/Personel/';

  get_personel_all() {
    return this.http.get<XResult>(this.base_url + 'get_personel_all')
  }

  check_personel_log_in(personel: Personel): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'check_personel_log_in', personel)
  }


  edit_personel(Id: number) {
    return this.http.get<XResult>(this.base_url + 'edit_personel/' + Id)
  }

  add_update_personel(personel: Personel): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'add_update_personel', personel)
  }


  update_active_status(personel: Personel): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'update_active_status', personel)
  }



}

