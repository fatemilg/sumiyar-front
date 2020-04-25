import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';

@Injectable({
    providedIn: 'root'
})

export class LogUserService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    readonly base_url = this.envUrl.urlAddress + '/api/LogUser/';

    get_id_personel_in_log_user_by_token(token:string) {
        return this.http.get<XResult>(this.base_url + 'get_id_personel_in_log_user_by_token/' + token)
    }


}
