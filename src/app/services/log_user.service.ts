import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personel } from '../models/Personel'
import { EnvironmentUrlService } from './shared/environment-url.service';
import { Observable } from 'rxjs';
import { XResult } from '../models/Xresult';
import { LogUser } from '../models/Loguser';

@Injectable({
  providedIn: 'root'
})

export class LogUserService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  readonly base_url = this.envUrl.urlAddress + '/api/LogUser/';


}

