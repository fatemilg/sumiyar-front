import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task_service';
import { TaskHistoryService } from '../services/task_history_service';
import { IndustryService } from '../services/industry_service';
import { Industry } from '../models/Industry';
import { XResult } from '../models/Xresult';
import { Task } from '../models/Task';
import { GeneralFunc } from '../scripts/general_func';
import { MatPaginator, MatTableDataSource, MatSort, MatBottomSheet } from '@angular/material';
import { TaskCategoryService } from '../services/task_category_service';
import { TaskCategory } from '../models/TaskCategory';
import { TaskHistoryComponent } from '../task-history/task-history.component';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private task_history_service: TaskHistoryService,
    private task_service: TaskService,
    private task_category_service: TaskCategoryService,
    private industry_service: IndustryService,
    private general_func: GeneralFunc,
    private bottom_sheet: MatBottomSheet
  ) { }

  res_industries: Industry[];
  res_task_categories: TaskCategory[];
  visible_task_category_list: boolean =false;
  visible_task_list: boolean =false;
  visible_progress: boolean;



  //table-config
  displayed_columns: string[] = ['TaskTitle', 'Details'];
  data_source: MatTableDataSource<Task>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;




  get_industry_all() {
    this.visible_progress = true;
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
          this.visible_progress = false;

        })

  }

  get_task_category_by_industry(id_industry) {
    this.visible_progress = true;
    return this.task_category_service
      .get_task_category_by_industry(id_industry)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.res_task_categories = data.Value;
          this.visible_task_category_list=true;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }


  get_task_by_task_category(id_task_category) {
    this.visible_progress = true;
    return this.task_service
      .get_task_by_task_category(id_task_category)
      .subscribe((data: XResult) => {
        if (data.IsOK) {
          this.data_source = new MatTableDataSource(data.Value);
          this.data_source.paginator = this.paginator;
          this.data_source.sort = this.sort;
          this.visible_task_list=true;
        }
        else {
          this.general_func.ShowMessage(data.Message, data.IsOK);
        }
        this.visible_progress = false;
      })
  }



  apply_filter(filter_value: string) {
    filter_value = filter_value.trim(); // Remove whitespace
    filter_value = filter_value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data_source.filter = filter_value;
  }


  load_task_history_by_id_task(id_task, task_title): void {
    this.bottom_sheet.open(TaskHistoryComponent, {
      data: { IDTask: id_task, TaskTitle: task_title }
      // disableClose :true

    });
  }

  ngOnInit() {
    this.get_industry_all();
  }

}
