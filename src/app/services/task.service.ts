import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task'
import { EnvironmentUrlService } from './shared/environment-url.service';
import { Observable } from 'rxjs';
import { XResult } from '../models/Xresult';

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    readonly base_url = this.envUrl.urlAddress + '/api/Task/';



    get_task_by_industry(id_industry:number) {
        return this.http.get<XResult>(this.base_url + 'get_task_by_industry/' + id_industry)
    }

}

