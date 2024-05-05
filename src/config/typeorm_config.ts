import {TypeOrmModuleOptions} from '@Nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Autorisation } from 'src/autorisation/entities/autorisation.entity';
import { Demande } from 'src/demande/entities/demande.entity';
import { Departement } from 'src/departement/entities/departement.entity';

export const typeorm : TypeOrmModuleOptions = {

    type: 'postgres' , 
    host: 'localhost' , 
    port: 5432 , 
    username: 'postgres' , 
    password : 'lana12' , 
    database: 'TaskManagement' , 
    entities: [User , Demande , Departement , Autorisation ],
    synchronize: true,


}