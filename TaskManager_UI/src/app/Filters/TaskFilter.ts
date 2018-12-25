import { Pipe, PipeTransform } from '@angular/core';
import { TaskModelModule } from '../Model/task-model.module';
import { IMPLICIT_REFERENCE } from '@angular/compiler/src/render3/view/util';

@Pipe({
name: 'taskFilter'
})

export class TaskFilterPipe implements PipeTransform
{
    transform(items : TaskModelModule[], filter : TaskModelModule) : any {
        console.log("Filer Pipe fired " + filter)        
        if(!items || filter == null)
        {
            console.log("Filer returned");
            console.log(items);
            return items;
        }
        console.log(items);
        console.log(filter);
        items = items.filter(item =>          
                 (!filter.TaskDescripton ? true : item.TaskDescripton.indexOf(filter.TaskDescripton) == 0) &&
                 (!filter.ParentTask.ParentTaskName ? true : item.ParentTask.ParentTaskName.indexOf(filter.ParentTask.ParentTaskName) != -1) &&
                 (!filter.Priority ? true : item.Priority >= filter.Priority) &&
                 (!filter.PriorityTo ? true : item.PriorityTo <= filter.PriorityTo) &&
                 (!filter.StartDate ? true : item.StartDate >= filter.StartDate) &&
                 (!filter.EndDate ? true :item.EndDate <= filter.EndDate)                  
        );       
        return items;
    }
}