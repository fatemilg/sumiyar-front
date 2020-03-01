import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})

export class LogUserService {

  constructor( private cookie: CookieService,) { }

  set_token(token: string) {
    this.cookie.set('Token', token, 1, '/');
    var a = this.cookie.get('Token');
  }
  get_token() {
    return this.cookie.get('Token');
  }
  is_log_in() {
    return this.get_token() !== '';
  }
  remove_token() {
    this.cookie.delete('Token', '/');
  }


}

