import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutorisationDto } from './dto/create-autorisation.dto';
import { UpdateAutorisationDto } from './dto/update-autorisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Autorisation } from './entities/autorisation.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AutorisationService {
  constructor(
    @InjectRepository(Autorisation)
    private AutorisationRepository: Repository<Autorisation>,



){}

async Createautorisation(CreateautorisationDto : CreateAutorisationDto , user : User): Promise<Autorisation>{
  const {heure_debut , heure_fin  , jour} = CreateautorisationDto;
  const autorisation = new Autorisation();
  autorisation.heure_debut = heure_debut ; 
  autorisation.jour = jour ; 

  
  autorisation.heure_fin = heure_fin ; 

  autorisation.user = user;
  autorisation.status = "En Attente";
  await autorisation.save();
  
  return autorisation ; 



}
async deleteUser(id: number): Promise<void> {
   
  const user = await this.AutorisationRepository.findOne({ where: { id } });
  if (!user) {
      throw new NotFoundException('User not found');
  }

 
  await this.AutorisationRepository.delete(id);
}




async findAll(user: User): Promise<Autorisation[]> {
  console.log('USER ISSSSSSS');

  console.log(user.userrole);

  if (user.userrole === 'Admin') {
    return this.AutorisationRepository.find({ relations: ['user'] });
  } else if (user.userrole === 'chef département') {
    if (!user.departement) {
      throw new Error('User department is not defined.');
    }

    const autorisations = await this.AutorisationRepository
      .createQueryBuilder('autorisation')
      .innerJoin('autorisation.user', 'usr')
      .innerJoin('usr.departement', 'departement')
      .where('departement.id = :departmentId', { departmentId: user.departement.id })
      .getMany();

    return autorisations;
  } else {
    return this.AutorisationRepository.find({ where: { userId: user.id }, relations: ['user'] });
  }
}


async getautorisationById(id: number): Promise<Autorisation> {
  const autorisation = await this.AutorisationRepository.findOne({ where: { id } } );
  if (!autorisation) {
      throw new NotFoundException('User not found');
  }
  return autorisation;
}

async updateStatus(id: number, newStatus: string): Promise<Autorisation> {
  const autorisation = await this.getautorisationById(id);
  if (!autorisation) {
    throw new Error('autorisation not found');
  }
  autorisation.status = newStatus;
  return this.AutorisationRepository.save(autorisation);
}



async findDemandsbyDepartement(user : User): Promise<Autorisation[]> {
  const query = this.AutorisationRepository.createQueryBuilder('autorisation')
  .innerJoin('autorisation.user', 'usr')
  .innerJoin('usr.departement', 'departement') // Assuming the relation between User and Departement is named 'departement'
  .andWhere('departement.id = :departmentId', { departmentId: user.DepartmentId })
  .andWhere('autorisation.status = :status', { status: 'Accepté' });

const autorisations = await query.getMany();
return autorisations;


}
}
