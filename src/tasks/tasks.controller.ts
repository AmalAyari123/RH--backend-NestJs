import { Controller  , Get , Post , Body, Put , Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';
import { TaksValidationStatusPipe } from 'src/pipes/task-status-validation-pipe';
import { Task } from './Task.entity';
@Controller('tasks')
export class TasksController {
    constructor( private tasksService : TasksService){}


    @Get(':id')
    
    GetTaskById(@Param ('id' , ParseIntPipe) id : number ): Promise<Task> {
        return this.tasksService.getTaskById(id);

    }
@Post()

CreateTask(@Body() createtaskdto : CreateTaskDto): Promise<Task> {
    return this.tasksService.CreateTask(createtaskdto)

}
@Delete(':id')
deleteTask(@Param('id' , ParseIntPipe) id : number) : Promise<void> {
  return   this.tasksService.DeleteTask(id);
}
/*@Patch('/:id/status')
UpdateTask(@Param('id' , ParseIntPipe) id: number ,
@Body('status' , TaksValidationStatusPipe)) : Promise<Task>{
return this.tasksService.UpdateTaskStatus(id,status);
}*/


  /* @Get()
GetAllTasks() : Task[] {
    return this.tasksService.GetAllTasks();
}
@Get()
@UsePipes(ValidationPipe)
getTasksWithFilter(@Query() filtertask : GetTasksFilter): Task[] {
if (Object.keys(filtertask).length){
    return this.tasksService.GetTaskWithFilter(filtertask);
} else{
    return this.tasksService.GetAllTasks();
}

}
@Get(':/id')
GetTaskById(@Param('id') id :String){
    return this.tasksService.GetTaskById(id);

}
@Delete(':/id')
DeleteTask(@Param('id') id:String){
    return this.tasksService.DeleteTask(id);

}

@Post()
@UsePipes(ValidationPipe)
CreateTask(@Body() CreateTaskDto : CreateTaskDto): Task {
    
   return  this.tasksService.CreateTask(CreateTaskDto);
 }
@Patch(':/id/status')
updateTaskStatus(
    @Param('id') id:String , 
    @Body('status' , TaksValidationStatusPipe) status: TaskStatus, 
){
 return this.tasksService.UpdateTask(id, status);

} */




}


