import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';
import{InjectRepository} from '@nestjs/typeorm'
import { Task } from './Task.entity';
import { TaskStatus } from './task-status';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private TaskRepository: Repository<Task>,

    ){}

    async getTaskById(id : number) : Promise<Task>{
        const found = await this.TaskRepository.findOneById(id);
        if (!found){
            throw new NotFoundException('aaaaa');
           
        }
        return found;

    }

    async CreateTask(createtaskdto : CreateTaskDto): Promise<Task>{
        const {title , description} = createtaskdto;
        const task = new Task();
        task.title = title ; 
        task.description = description; 
        task.status = TaskStatus.OPEN;
        await task.save();
        return task ; 



    }

    async DeleteTask(id: number) : Promise<any>{
        const result = await this.TaskRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException('task not found');
        }

    }
    async UpdateTaskStatus (id : number , status : TaskStatus) : Promise<any> {
        const task = this.getTaskById(id);
    
        console.log(task);
      //await this.TaskRepository.save();
        return task ; 
    }
    
   /* GetAllTasks(): Task[] {
        return this.tasks
    }
    GetTaskById(id:String) : Task{
        const found =  this.tasks.find(taskk => taskk.id == id) 
        if (!found){
            throw new NotFoundException();
           
        }
        return found;
       }
       DeleteTask(id: String){
        return this.tasks.filter(task => task.id !== id)

       }
       GetTaskWithFilter(dtofilter : GetTasksFilter){
        const{search , status} = dtofilter ; 
        let tasks =  this.GetAllTasks();
        if (status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks.filter(task => 
                task.title.includes(search) || task.description.includes(search)
                );
        }
        return tasks;


       } //http://localhost:3000/tasks?status=done&search=c
    CreateTask(createTaskDto : CreateTaskDto) {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid.v4(),
            title,
            description, 
            status: TaskStatus.DONE,
            };
        this.tasks.push(task);
        return task;
        

    }
   async  UpdateTask(id:number  , status : TaskStatus){
        const task = this.getTaskById(id);
        (await task).status = status ; 
        return task;
    } */

}
