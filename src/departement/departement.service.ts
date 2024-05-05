import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departement } from './entities/departement.entity';

@Injectable()
export class DepartementService {


  constructor(
    @InjectRepository(Departement)
    private departmentRepository: Repository<Departement>,
  ) {}

  async getDepartmentById(id : number) : Promise<Departement>{
    const found = await this.departmentRepository.findOneById(id);
    if (!found){
        throw new NotFoundException('aaaaa');
       
    }
    return found;

}
async findAll(): Promise<Departement[]> {
  return this.departmentRepository.find();
}
  
 
}
