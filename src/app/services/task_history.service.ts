import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './shared/environment-url.service';
import { XResult } from '../models/Xresult';
import { TaskHistory } from '../models/TaskHistory';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TaskHistoryService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    readonly base_url = this.envUrl.urlAddress + '/api/TaskHistory/';



    get_task_history_by_id_task(id_task:number) {
        return this.http.get<XResult>(this.base_url + 'get_task_history_by_id_task/' + id_task)
    }

    add_task_history(task_history: TaskHistory): Observable<XResult> {

        return this.http.post<XResult>(this.base_url + 'add_task_history', task_history)

    }
    delete_task_history_by_Id(task_history: TaskHistory): Observable<XResult> {
        return this.http.post<XResult>(this.base_url + 'delete_task_history_by_Id', task_history)
    }



}
