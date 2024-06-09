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
import { DemandeService } from 'src/demande/demande.service';
import { DemandeModule } from 'src/demande/demande.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationModule } from 'src/notifications/notifications.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([User , DepartementService , DatabaseFilesService,DemandeService ]),
    EmailModule, UserRepository , DepartementModule  , DatabaseFileModule, DemandeModule
  ],
  providers: [UserService , DepartementService ,DatabaseFilesService , DemandeService] ,
  exports: [UserService , UserRepository , TypeOrmModule],
  controllers: [UsersController]


})
export class UsersModule {}
