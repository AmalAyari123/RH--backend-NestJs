import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DatabaseFile from './databaseFile.entity';
import { DatabaseFileRepository } from './DataBaseFileRepository';
 
@Injectable()
class DatabaseFilesService {
  constructor(
    @InjectRepository(DatabaseFile)
        private databaseFileRepository: DatabaseFileRepository,
  ) {}
 
  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = await this.databaseFileRepository.create({
      filename,
      data: dataBuffer
    })
    await this.databaseFileRepository.save(newFile);
    return newFile;
  }
 
  async getFileById(id: number) : Promise<DatabaseFile> {
    const file = await this.databaseFileRepository.findOne({ where: { id } } );
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
 
export default DatabaseFilesService;