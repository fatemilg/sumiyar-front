import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personel } from '../models/Personel'
import { EnvironmentUrlService } from './shared/environment-url.service';
import { Observable } from 'rxjs';
import { XResult } from '../models/Xresult';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  readonly base_url = this.envUrl.urlAddress + '/api/Token/';

  set_token(token: string) {
    localStorage.setItem('Token', token);
  }
  get_token() {
    return   localStorage.getItem('Token');
  }
  is_authenticated() {
    return this.get_token() !== null; 
  }
  remove_token() {
    localStorage.removeItem('Token');
  }

  generate_token(personel: Personel): Observable<XResult> {
    return this.http.post<XResult>(this.base_url + 'generate_token', personel)
  }


}

