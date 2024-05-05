import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, UsePipes } from '@nestjs/common';
import { AutorisationService } from './autorisation.service';
import { CreateAutorisationDto } from './dto/create-autorisation.dto';
import { UpdateAutorisationDto } from './dto/update-autorisation.dto';
import { AuthGuard } from 'src/auth/jwt-auth-guard';
import { User } from 'src/auth/user.entity';
import { Autorisation } from './entities/autorisation.entity';

@Controller('Autorisation')
export class AutorisationController {
  constructor(private readonly autorisationService: AutorisationService) {}

  @Post()
  @UseGuards(AuthGuard)


 create(@Body()  createautorisationDto: CreateAutorisationDto,  @Req() req: any ) {
    const user: User = req.user;
    console.log(req.user);
    return this.autorisationService.Createautorisation(createautorisationDto , user);
  }

  
  @Patch(':id/status')
  @UseGuards(AuthGuard)
  async updateStatus(
    @Param('id') id: number,
    @Body('status') newStatus: string,
  ): Promise<Autorisation> {
    return this.autorisationService.updateStatus(id, newStatus);
  }


 

  @Delete('id/:id')
  deleteTask(@Param('id' , ParseIntPipe) id : number) : Promise<void> {
    return   this.autorisationService.deleteUser(id);
  }

 
 
 

 @UseGuards(AuthGuard)

  @Get() 
 /* @Role('Admin') */
  async getAll( @Req() req: any){
    const user: User = req.user;
    console.log(user);


    return this.autorisationService.findAll(user);
  }


  @UseGuards(AuthGuard)

  @Get('Z') 
 /* @Role('Admin') */
  async getDemandsByDepartement( @Req() req: any){
    const user: User = req.user;
    console.log(user);


    return this.autorisationService.findDemandsbyDepartement(user);
  }

  

  /*@Get('A')
@UsePipes(ValidationPipe)
getDmenadeWithFilter(@Query() filtertask : GetautorisationFilter): Promise<autorisation[]> {
if (Object.keys(filtertask).length){
    return this.autorisationService.GetautorisationWithFilter(filtertask);
} 

}*/

  
}
