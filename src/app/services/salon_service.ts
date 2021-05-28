import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { Observable } from 'rxjs';
import { Contract } from '../models/Contract';

@Injectable({
  providedIn: 'root'
})

export class SalonService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/Salon/';

  get_salons_all() {
    return this.http.get<XResult>(this.base_url + 'get_salons_all')
  }
  
  get_salon_line_all() {
    return this.http.get<XResult>(this.base_url + 'get_salon_line_all')
  }




}

