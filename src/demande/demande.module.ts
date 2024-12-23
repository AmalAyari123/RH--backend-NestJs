import { Module, forwardRef } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import {TypeOrmModule} from '@Nestjs/typeorm';
import { Demande } from './entities/demande.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/auth/User.module';
import { RolesGuard } from 'src/auth/role.guard';
import DatabaseFilesService from 'src/databaseFile.Service';
import { DatabaseFileModule } from 'src/databaseFile.module';
import { NotificationModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([Demande , DatabaseFilesService ]) , 
    AuthModule,DatabaseFileModule,forwardRef(() => UsersModule) 
  ],
  controllers: [DemandeController],
  providers: [DemandeService , AuthModule , AuthService , DatabaseFilesService  ] ,
  exports: [TypeOrmModule]
})
export class DemandeModule {}