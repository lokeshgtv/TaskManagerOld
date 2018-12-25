import { Component, OnInit } from '@angular/core';
import { TaskModelModule } from '../Model/task-model.module'
import { TaskserviceService } from '../taskservice.service'
import { Input } from '@angular/core';
import { TaskFilterPipe } from '../Filters/TaskFilter'
import { ParentTaskModelModule } from '../Model/parent-task-model.module';
import { ActivatedRoute,Router } from '@angular/router';
import { RouterPreloader } from '@angular/router/src/router_preloader';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  filterTaskDetails : TaskModelModule;
  filteredDetails : TaskModelModule[];

  @Input()
  AllTasksInfo: TaskModelModule[];

  constructor(private taskService: TaskserviceService, private taskFilering : TaskFilterPipe, private router:Router) { }

  ngOnInit() {

    this.filterTaskDetails = new TaskModelModule();
    this.filterTaskDetails.ParentTask = new ParentTaskModelModule();
    // this.filterTaskDetails.TaskDescripton = "Task 1";
    // this.filterTaskDetails.ParentTask.ParentTaskName = "Parent Task1";
    // this.filterTaskDetails.Priority = 1;
    // this.filterTaskDetails.PriorityTo = 30;
    //this.filterTaskDetails.StartDate = new Date("2017-01-01");
    //this.filterTaskDetails.EndDate = new Date("2019-12-30");
    this.taskService.getAllTasks().subscribe(x => this.AllTasksInfo = x)
    this.filteredDetails = this.AllTasksInfo;
  }

  OnSearchCriteriaChanged(searchValue : string ) 
  {     

    this.filteredDetails = this.taskFilering.transform(this.AllTasksInfo, this.filterTaskDetails);      
  }

  OnEdit(selectedItem : TaskModelModule){
    console.log(selectedItem)
    this.router.navigate(["/edittask", selectedItem]);
  }


}
