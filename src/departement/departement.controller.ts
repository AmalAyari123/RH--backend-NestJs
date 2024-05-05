import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { Demande } from 'src/demande/entities/demande.entity';
import { Departement } from './entities/departement.entity';

@Controller('departement')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}




  @Get()
  /*@UseGuards(JwtAuthGuard)*/
  async findAll(): Promise<any[]> {
    return this.departementService.findAll();
  }

@Get(':id')
async getDepartmentById (@Param ('id' , ParseIntPipe) id : number ) : Promise<Departement> {
  return this.departementService.getDepartmentById(id);
}




}
