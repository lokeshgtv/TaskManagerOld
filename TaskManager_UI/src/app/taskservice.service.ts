import { Injectable } from '@angular/core';
import { TaskModelModule } from './Model/task-model.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ParentTaskModelModule } from './Model/parent-task-model.module';
import { of } from 'rxjs';
// import { HttpHeaders } from '@angular/common/http';
// import { URLSearchParams } from 'url';
// import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(private httpService: HttpClient) { }

  getAllTasks(): Observable<TaskModelModule[]> {

    //return this.httpService.get<TaskModelModule[]>("http://localhost:52537/api/task/GetAllTask");
    return of(this.taskData);
  }

  getTaskById(id:number): Observable<TaskModelModule> {

    return this.httpService.get<TaskModelModule>("http://localhost:52537/api/task/GetTaskById/"+id);

  }

  AddTaskDetails(task: TaskModelModule) {

    return this.httpService.post("http://localhost:52537/api/task", task);
  }

  private taskData: TaskModelModule[] = [
    { TaskId: 1, TaskDescripton: "Task 1", ParentTask: { ParentTaskId: 1, ParentTaskName: "Parent Task1" }, Priority: 1, PriorityTo: 30, StartDate: new Date(2018, 12, 6), EndDate: new Date(2018, 12, 20), IsFinished:false },
    { TaskId: 2, TaskDescripton: "Task 2", ParentTask: { ParentTaskId: 2, ParentTaskName: "Parent Task2" }, Priority: 30, PriorityTo: 30, StartDate: new Date(2018, 11, 25), EndDate: new Date(2018, 12, 10), IsFinished:false },
    { TaskId: 3, TaskDescripton: "Task 3", ParentTask: { ParentTaskId: 2, ParentTaskName: "Parent Task3" }, Priority: 20, PriorityTo: 30, StartDate: new Date(2018, 10, 11), EndDate: new Date(2018, 10, 28), IsFinished:false }
  ];

  private parentTask: ParentTaskModelModule[] = [
    { ParentTaskId: 1, ParentTaskName: "Parent Task1" }, { ParentTaskId: 2, ParentTaskName: "Parent Task2" },
  ];
}
