import { Module } from '@nestjs/common';
import { AutorisationService } from './autorisation.service';
import { AutorisationController } from './autorisation.controller';
import { Autorisation } from './entities/autorisation.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/auth/User.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([Autorisation]) , 
    AuthModule, UsersModule
  ],
  controllers: [AutorisationController],
  providers: [AutorisationService ,  AuthModule , AuthService ],
})
export class AutorisationModule {}
