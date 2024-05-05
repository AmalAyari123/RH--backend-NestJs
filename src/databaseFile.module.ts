// database-file.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFilesService from './databaseFile.Service';
import { DatabaseFileRepository } from './DataBaseFileRepository';


@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFileRepository])],
  providers: [DatabaseFilesService, DatabaseFileRepository], // Include DatabaseFileRepository in the providers array
  exports: [DatabaseFilesService], // Export DatabaseFilesService if needed
})
export class DatabaseFileModule {}
