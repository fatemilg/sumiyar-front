import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TaskHistory } from '../models/TaskHistory';
import { TaskHistoryService } from '../services/task_history.service';
import { XResult } from '../models/Xresult';
import { GeneralFunc } from '../scripts/general_func';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {

  constructor(
    private task_history_service: TaskHistoryService,
    private general_func: GeneralFunc,
    @Inject(MAT_BOTTOM_SHEET_DATA) public pass_data: any
  ) { }

  id_task = this.pass_data.IDTask;
  task_title = this.pass_data.TaskTitle;
  model_task_history = new TaskHistory()
  visible_progress: boolean;

  //table-config
  displayed_columns: string[] = ['Actions', 'CreateDate', 'EstimateWage', 'EstimateTime'];
  data_source: MatTableDataSource<TaskHistory>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  get_task_history_by_id_task() {
    this.visible_progress = true;
    return this.task_history_service
      .get_task_history_by_id_task(this.id_task)
      .subscribe(
        (data: XResult) => {
          if (data.IsOK) {
            this.data_source = new MatTableDataSource(data.Value);
            this.data_source.paginator = this.paginator;
            this.data_source.sort = this.sort;
          }
          else {
            this.general_func.ShowMessage(data.Message, data.IsOK);
          }
          this.visible_progress = false;
        })
  }



  add_task_history(item) {
    this.visible_progress = true;
    item.IDTask = this.id_task;
    return this.task_history_service
      .add_task_history(item)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.clear_form_task_history();
          this.get_task_history_by_id_task();
        }
        this.general_func.ShowMessage(data.Message, data.IsOK);
        this.visible_progress = false;
      });
  }


  delete_task_history_by_Id(item) {
    this.visible_progress = true;
    let c = confirm("آیا مطمئن هستید ?");
    if (c) {
      return this.task_history_service
        .delete_task_history_by_Id(item)
        .subscribe((data: XResult) => {
          if (data.IsOK) {
            this.clear_form_task_history();
            this.get_task_history_by_id_task();
          }
          this.general_func.ShowMessage(data.Message, data.IsOK);
          this.visible_progress = false;

        });
    }
    else {
      this.visible_progress = false;
    }

  }

  clear_form_task_history() {
    this.model_task_history = new TaskHistory();

  }

  ngOnInit() {
    this.get_task_history_by_id_task();
  }

}
