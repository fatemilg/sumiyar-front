import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { AccessLevel } from '../models/AccessLevel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AccessLevelService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    readonly base_url = this.envUrl.urlAddress + '/api/AccessLevel/';

    get_access_level_by_personel(id_personel:number) {
        return this.http.get<XResult>(this.base_url + 'get_access_level_by_personel/' + id_personel)
    }
    generate_pages_by_access_level(id_personel: number) {
        return this.http.get<XResult>(this.base_url + 'generate_pages_by_access_level/' + id_personel)
      }

    add_all_pages_for_personel(access_level: AccessLevel): Observable<XResult> {
        return this.http.post<XResult>(this.base_url + 'add_all_pages_for_personel', access_level)
    }
    update_access(access_level: AccessLevel): Observable<XResult> {
        return this.http.post<XResult>(this.base_url + 'update_access', access_level)
    }
}

