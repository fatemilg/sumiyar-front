import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/Role/';

  get_role_all() {
    return this.http.get<XResult>(this.base_url + 'get_role_all')
  }


}

