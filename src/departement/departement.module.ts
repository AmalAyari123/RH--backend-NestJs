import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { Departement } from './entities/departement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Departement])
  ],
  controllers: [DepartementController],
  providers: [DepartementService],
  exports : [TypeOrmModule],

})
export class DepartementModule {}
