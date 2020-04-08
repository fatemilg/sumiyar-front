import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskCategory } from '../models/TaskCategory'
import { EnvironmentUrlService } from './shared/environment-url.service';
import { Observable } from 'rxjs';
import { XResult } from '../models/Xresult';

@Injectable({
    providedIn: 'root'
})

export class TaskCategoryService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    readonly base_url = this.envUrl.urlAddress + '/api/TaskCategory/';


    get_task_category_by_industry(id_industry:number) {
        return this.http.get<XResult>(this.base_url + 'get_task_category_by_industry/' + id_industry)
    }
   

}

