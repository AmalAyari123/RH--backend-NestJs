import {TypeOrmModuleOptions} from '@Nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/Task.entity';

export const typeorm : TypeOrmModuleOptions = {

    type: 'postgres' , 
    host: 'localhost' , 
    port: 5432 , 
    username: 'postgres' , 
    password : 'lana12' , 
    database: 'TaskManagement' , 
    entities: [Task,User],
    synchronize: true,


}