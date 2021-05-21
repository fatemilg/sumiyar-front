import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';

@Injectable({
    providedIn: 'root'
})

export class LineService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    readonly base_url = this.envUrl.urlAddress + '/api/Line/';

    get_line_by_salon(id_salon:number) {
        return this.http.get<XResult>(this.base_url + 'get_line_by_salon/' + id_salon)
    }
}

