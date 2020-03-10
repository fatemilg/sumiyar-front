import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskHistoryService } from '../services/task_history.service';
import { IndustryService } from '../services/industry.service';
import { Industry } from '../models/Industry';
import { XResult } from '../models/Xresult';
import { TaskHistory } from '../models/TaskHistory';
import { Task } from '../models/Task';
import { GeneralFunc } from '../scripts/general_func';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';



@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css']
})
export class ManageTasksComponent implements OnInit {

  constructor(private task_history_service: TaskHistoryService,
    private task_service: TaskService,
    private industry_service: IndustryService,
    private general_func: GeneralFunc
  ) { }

  res_tasks: Task[];
  res_industries: Industry[];
  model_task_history = new TaskHistory()
  visible_progress: boolean;
  industry_selected: boolean = false;

  //table-config
  displayed_columns: string[] = ['Actions', 'CreateDate', 'IndustryTitle', 'TaskTitle', 'EstimateTime', 'EstimateWage',];
  data_source: MatTableDataSource<TaskHistory>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;




  get_industry_all() {
    return this.industry_service
      .get_industry_all()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.res_industries = data.Value;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }

        })
  }

  load_tasks_by_industry(id_industry) {
    this.industry_selected = true;
    return this.task_service
      .get_task_by_industry(id_industry)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_tasks = data.Value;
          this.model_task_history.IDTask = this.res_tasks[0].IDTask;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
      })
  }

  add_task_history(item) {
    return this.task_history_service
      .add_task_history(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.clear_form_task_history();
          this.get_task_history_all();
        }
        this.general_func.ShowMessage(data.Message, data.IsOK);

      });
  }
  get_task_history_all() {
    return this.task_history_service
      .get_task_history_all()
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.data_source  = new MatTableDataSource(data.Value);
            this.data_source.paginator = this.paginator;
            this.data_source.sort = this.sort;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }

        })
  }

  delete_task_history_by_Id(item) {
    let  c = confirm("آیا مطمئن هستید ?");  
    if(c)
    {
      return this.task_history_service
      .delete_task_history_by_Id(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.get_task_history_all();
        }
        this.general_func.ShowMessage(data.Message, data.IsOK);

      });
    }

  }
  clear_form_task_history() {
    this.model_task_history = new TaskHistory();
    this.model_task_history.IDIndustry = 0;
    this.industry_selected = false;
  }
  
  apply_filter(filter_value: string) {
    filter_value = filter_value.trim(); // Remove whitespace
    filter_value = filter_value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data_source.filter = filter_value;
  }

  ngOnInit() {
    this.get_industry_all();
    this.get_task_history_all();
   
  }

}
