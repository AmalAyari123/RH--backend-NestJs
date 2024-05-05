import { Module } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { DemandeController } from './demande.controller';
import {TypeOrmModule} from '@Nestjs/typeorm';
import { Demande } from './entities/demande.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/auth/User.module';
import { RolesGuard } from 'src/auth/role.guard';

@Module({
  imports : [
    TypeOrmModule.forFeature([Demande]) , 
    AuthModule, UsersModule
  ],
  controllers: [DemandeController],
  providers: [DemandeService , AuthModule , AuthService ] ,
})
export class DemandeModule {}
