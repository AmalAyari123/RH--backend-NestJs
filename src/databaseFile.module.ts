// database-file.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFilesService from './databaseFile.Service';
import { DatabaseFileRepository } from './DataBaseFileRepository';
import DatabaseFile from './databaseFile.entity';
import DatabaseFilesController from './databaseFile.controller';


@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile]) ],
  controllers:[DatabaseFilesController],
  providers: [DatabaseFilesService , DatabaseFileRepository], // Include DatabaseFileRepository in the providers array
  exports: [TypeOrmModule], // Export DatabaseFilesService if needed
})
export class DatabaseFileModule {}
