import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { typeorm } from './config/typeorm_config';
import {TypeOrmModule} from '@Nestjs/typeorm';

import { UsersModule } from './auth/User.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeorm),
    
    
     TasksModule,
    
    
    UsersModule,
    AuthModule
    
    
    ],
  
})
export class AppModule {

}
