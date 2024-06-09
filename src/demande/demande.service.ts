import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Demande } from './entities/demande.entity';
import { DemandeStatus } from './demande-status';
import { User } from 'src/auth/user.entity';
import { GetDemandeFilter } from './get-demande-filter.dto';
import DatabaseFilesService from 'src/databaseFile.Service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class DemandeService {
  demandService: any;
  constructor(
    @InjectRepository(Demande)
    private DemandeRepository: Repository<Demande>,
    private readonly databaseFilesService: DatabaseFilesService,





){}

async CreateDemande(CreateDemandeDto : CreateDemandeDto , user : User): Promise<Demande>{
  const {date_debut , date_fin , type , commentaire , justificatifId , count} = CreateDemandeDto;



  const demande = new Demande();
  demande.count = count ; 
  
  demande.date_debut = date_debut ; 
  demande.date_fin = date_fin; 
  demande.type = type;
  demande.commentaire = commentaire ; 
  demande.justificatifId = justificatifId ;
  demande.user = user;
  demande.status = "En Attente";
  

  await demande.save();
  console.log(user);
  
  return demande ; 



}
async deleteUser(id: number): Promise<void> {
   
  const user = await this.DemandeRepository.findOne({ where: { id } });
  if (!user) {
      throw new NotFoundException('User not found');
  }

 
  await this.DemandeRepository.delete(id);
}

async deleteDemand(demandId: number): Promise<void> {
  const demand = await this.DemandeRepository.findOne({ where: { id: demandId } });
  if (!demand) {
    throw new NotFoundException(`Demand with ID ${demandId} not found`);
  }

  await this.DemandeRepository.delete(demandId);
}

async addJustificatif(Id: number, imageBuffer: Buffer, filename: string) {
  if (!Id) {
    throw new NotFoundException('Demand ID is required');
  }
  const justificatif = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
  await this.DemandeRepository.update(Id, {
    justificatifId: justificatif.id
  });
  return justificatif;
}






async findAlll(user : User): Promise<Demande[]> {
  console.log(user.userrole); 

  if (user.userrole == 'Admin' ) {
    return this.DemandeRepository.find({ relations: ['user'] });
  }  else if (user.userrole === 'chef département') {
    console.log(user);

    
    const query = this.DemandeRepository.createQueryBuilder('demande')
        .innerJoin('demande.user', 'usr')
        .innerJoin('usr.departement', 'departement') 
        .andWhere('departement.id = :departmentId', { departmentId: user.DepartmentId });

    const demandes = await query.getMany();
    return demandes;
    
   } else  {

   
    const query = this.DemandeRepository.createQueryBuilder('demande');
  
  query.where('demande.userId = :userId', { userId: user.id });
  
  const demande = await query.getMany();
  return demande;
  }
}

 async GetDemandeWithFilter(dtofilter: GetDemandeFilter): Promise<Demande[]> {
  const { search, status } = dtofilter;

  let queryBuilder = this.DemandeRepository.createQueryBuilder('demande');

  // Join the User entity
  queryBuilder = queryBuilder.innerJoin('demande.user', 'user').innerJoin('user.departement', 'departement');

  // Filter by status
  if (status) {
    queryBuilder = queryBuilder.andWhere('demande.status = :status', { status });
  }

  // Filter by user's name
  if (search) {
    queryBuilder = queryBuilder.andWhere('user.name LIKE :name OR departement.name LIKE :department', { name: `%${search}%` , department: `%${search}%` });
  }

  return queryBuilder.getMany();
}
async getDemandeById(id: number): Promise<Demande> {
  const demande = await this.DemandeRepository.findOne({ where: { id } } );
  if (!demande) {
      throw new NotFoundException('User not found');
  }
  return demande;
}

async updateDemande(id: number, updates: Partial<Demande>): Promise<Demande> {
  const user = await this.getDemandeById(id);

  Object.assign(user, updates);
  return this.DemandeRepository.save(user);
}



async findDemandsbyDepartement(user: User): Promise<Demande[]> {
  const query = this.DemandeRepository.createQueryBuilder('demande')
    .innerJoin('demande.user', 'usr')
    .innerJoin('usr.departement', 'departement') // Assuming the relation between User and Departement is named 'departement'
    .where('departement.id = :departmentId', { departmentId: user.DepartmentId });

  const demandes = await query.getMany();
  return demandes;
}

}



 

