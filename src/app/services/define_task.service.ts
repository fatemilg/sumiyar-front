import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { DefineTask } from '../models/DefineTask';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DefineTaskService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    readonly base_url = this.envUrl.urlAddress + '/api/DefineTask/';

    get_define_task_by_define(id_define:number) {
        return this.http.get<XResult>(this.base_url + 'get_define_task_by_define/' + id_define)
    }


    update_selected_define_task(define_task: DefineTask): Observable<XResult> {
        return this.http.post<XResult>(this.base_url + 'update_selected_define_task', define_task)
    }
}

