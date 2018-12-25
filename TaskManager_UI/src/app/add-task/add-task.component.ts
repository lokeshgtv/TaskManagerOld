import { Component, OnInit } from '@angular/core';
import { TaskModelModule } from '../Model/task-model.module';
import { ParentTaskModelModule } from '../Model/parent-task-model.module';
import { TaskserviceService } from '../taskservice.service';
import { FormArray, Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms'

import { Input } from '@angular/core';
import { Router, Route, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


  taskForm: FormGroup;
  tName: FormControl;
  tParentTask: FormControl;
  tPriority: FormControl;      
  tStartDate: FormControl;
  tEndDate: FormControl;

  @Input()
  taskModel: TaskModelModule;
  parentTaskModel: ParentTaskModelModule;


  constructor(private taskService: TaskserviceService, private taskRouter: Router, private activeRoute: ActivatedRoute) { 
    this.taskModel = new TaskModelModule();
    this.activeRoute.paramMap.pipe(switchMap((parms: ParamMap) => {
      console.log(parms);
      if (parms.has("id")) {
        let id = Number.parseInt(parms.get("id"));
        return this.taskService.getTaskById(id);
      }
      return of(new TaskModelModule());
    })).subscribe(x => {
      this.taskModel = x

      this.tName.setValue(x.TaskDescripton);
      this.tParentTask.setValue(x.ParentTask);
      this.tPriority.setValue(x.Priority);
      this.tStartDate.setValue(x.StartDate);
      this.tEndDate.setValue(x.EndDate);    
    });


  }

  ngOnInit() {

    this.tName = new FormControl(this.taskModel.TaskDescripton);
    this.tPriority = new FormControl(this.taskModel.Priority);
    this.tParentTask = new FormControl(this.taskModel.ParentTask);

    this.tStartDate = new FormControl(this.taskModel.StartDate);
    this.tEndDate = new FormControl(this.taskModel.EndDate);   

    this.taskForm = new FormGroup({ taskName: this.tName, priority: this.tPriority, parentTask: this.tParentTask, StartDate: this.tStartDate, EndDate : this.tEndDate });

  }

  AddTask() {
    if (this.taskForm.valid) {
      this.taskModel.TaskDescripton = this.tName.value;
      this.taskModel.Priority = this.tPriority.value;
      this.taskModel.ParentTask = this.tParentTask.value;
      this.taskModel.StartDate = this.tStartDate.value;
      this.taskModel.EndDate = this.tEndDate.value;

      this.taskService.AddTaskDetails(this.taskModel).subscribe(x => {
        console.log("Task Saved...");
      });
      console.log("Form is Valid");
    }
  }

}
