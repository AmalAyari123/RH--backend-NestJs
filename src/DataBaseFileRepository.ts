import { EntityRepository, Repository } from 'typeorm';
import DatabaseFile from './databaseFile.entity';

@EntityRepository(DatabaseFile)
export class DatabaseFileRepository extends Repository<DatabaseFile> {
    
}
