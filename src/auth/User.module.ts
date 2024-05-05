import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {TypeOrmModule} from '@Nestjs/typeorm';
import { UsersController } from './user.controller';
import { EmailModule } from 'src/mailer/mailer.module';
import { UserRepository } from './UserRepository';
import { DepartementModule } from 'src/departement/departement.module';
import { DepartementService } from 'src/departement/departement.service';
import DatabaseFilesService from 'src/databaseFile.Service';
import { DatabaseFileRepository } from 'src/DataBaseFileRepository';
import { DatabaseFileModule } from 'src/databaseFile.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([User , DepartementService]),
    EmailModule, UserRepository , DepartementModule  , DatabaseFileModule, 
  ],
  providers: [UserService , DepartementService ,DatabaseFilesService, DatabaseFileRepository] ,
  exports: [UserService , UserRepository],
  controllers: [UsersController]


})
export class UsersModule {}
