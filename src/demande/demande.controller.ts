import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe, UsePipes, Query, ParseIntPipe, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { User } from 'src/auth/user.entity';

import { UpdateDemandeDto } from './dto/update-demande.dto';
import { AuthGuard } from 'src/auth/jwt-auth-guard';
import { GetDemandeFilter } from './get-demande-filter.dto';
import { Demande } from './entities/demande.entity';
import { Roles } from 'src/auth/role-decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/rolecustom';
import { DemandeStatus } from './demande-status';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('demande')


export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}
 
  @Post()
  @UseGuards(AuthGuard)


 create(@Body()  createDemandeDto: CreateDemandeDto ,  @Req() req: any ) {
    const user: User = req.user;
    console.log(req.user);
    return this.demandeService.CreateDemande(createDemandeDto , user);
  }

  
  @Patch(':id')

  async updateDemande(
    @Param('id') id: number,
    @Body() updates: Partial<Demande>,
  ): Promise<Demande> {
    return this.demandeService.updateDemande(id, updates);
  }
  


 

  @Delete('id/:id')
  deleteUser(@Param('id' , ParseIntPipe) id : number) : Promise<void> {
    return   this.demandeService.deleteUser(id);
  }
  @Delete(':id')
  deleteDemand(@Param('id' , ParseIntPipe) id : number) : Promise<void> {
    return   this.demandeService.deleteDemand(id);
  }
  @Post('avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addJustif(@Query('demandId') demandId: number, @UploadedFile() file: Express.Multer.File) {
    return this.demandeService.addJustificatif(demandId, file.buffer, file.originalname);
  }


 
 
 

 @UseGuards(AuthGuard)

  @Get() 
 /* @Role('Admin') */
  async getAll( @Req() req: any){
    const user: User = req.user;
    console.log(user);


    return this.demandeService.findAlll(user);
  }


  @UseGuards(AuthGuard)

  @Get('Z') 
 /* @Role('Admin') */
  async getDemandsByDepartement( @Req() req: any){
    const user: User = req.user;
    console.log(user);


    return this.demandeService.findDemandsbyDepartement(user);
  }

  

  @Get('A')
@UsePipes(ValidationPipe)
getDmenadeWithFilter(@Query() filtertask : GetDemandeFilter): Promise<Demande[]> {
if (Object.keys(filtertask).length){
    return this.demandeService.GetDemandeWithFilter(filtertask);
} 

}



}
