import { Module } from '@nestjs/common';

import { typeorm } from './config/typeorm_config';
import {TypeOrmModule} from '@Nestjs/typeorm';

import { UsersModule } from './auth/User.module';
import { AuthModule } from './auth/auth.module';
import { DemandeModule } from './demande/demande.module';
import { DepartementModule } from './departement/departement.module';
import { RolesGuard } from './auth/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { AutorisationModule } from './autorisation/autorisation.module';
import { MulterModule } from '@nestjs/platform-express';
import { NotificationModule } from './notifications/notifications.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeorm),
    MulterModule.register({
      dest: './uploads', // Destination directory for uploaded files
    }),
    
     DepartementModule,
    
     AuthModule,
    UsersModule,
   
    DemandeModule,
    DepartementModule,
    AutorisationModule,
    NotificationModule,
     
    
    
    
    ],

    
 
  
})
export class AppModule {

}
