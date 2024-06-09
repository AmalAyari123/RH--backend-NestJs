import {TypeOrmModuleOptions} from '@Nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Autorisation } from 'src/autorisation/entities/autorisation.entity';
import DatabaseFile from 'src/databaseFile.entity';
import { Demande } from 'src/demande/entities/demande.entity';
import { Departement } from 'src/departement/entities/departement.entity';
import { NotificationToken } from 'src/notifications/entities/notification-token.entity';
import { Notification } from 'src/notifications/entities/notification.entity';



export const typeorm : TypeOrmModuleOptions = {

    type: 'postgres' , 
    host: 'localhost' , 
    port: 5432 , 
    username: 'postgres' , 
    password : 'lana12' , 
    database: 'TaskManagement' , 
    entities: [User , Demande , Departement , Autorisation , DatabaseFile , Notification , NotificationToken],
    synchronize: true,


}