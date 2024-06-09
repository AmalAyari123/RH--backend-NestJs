
import { Body, Controller, Post , Get , Param, NotFoundException, ParseIntPipe , Delete , Patch, UseGuards, Req, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from './jwt-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(
        @Body() userData: {
            name:string;
            email: string;
            password: string;
            NumTel: number;
            NumCIN: number;
            userrole : String;
            CompanyGroup: string;
            SoldeConge: number;
            Solde1: number;
            congeMaladie:number;
            recuperation:number;
            departmentId : number;
        },
    ): Promise<User> {
        return await this.userService.createUser(userData);
    }

    @Get('name/:name')
    async getUserByname(@Param('name') name: string): Promise<User> {
        const user = await this.userService.getUserByName(name);
        
        if (!user) {
            throw new NotFoundException(`User with  name  ${name} not found`);
        }

        return user;
    }

    @Get('email/:email')
    async getUserByemail(@Param('email') email: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);
        
        if (!user) {
            throw new NotFoundException(`User with emaileeeeee ${email} not found`);
        }

        return user;
    }
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id);
    }
  @Delete('id/:id')
deleteTask(@Param('id' , ParseIntPipe) id : number) : Promise<void> {
  return   this.userService.deleteUser(id);
}

@Get(':id/F')
    async getNotif(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findOne(id);
    }

@Patch(':id')

async updateUser(
  @Param('id') id: number,
  @Body() updates: Partial<User>,
  @Body('departmentId') departmentId: number
): Promise<User> {
  return this.userService.updateUser(id, updates);
}




@UseGuards(AuthGuard)
@Get('ZZ')
async getSameDepartmentUsers(@Req() req: any) {
  
  const user: User = req.user;

    const users = await this.userService.getUserByDepartement(user.DepartmentId);

    return users;
 
}

@UseGuards(AuthGuard)
@Patch(':userId/calculate-solde/:demandeId')
async calculateSolde(
  @Param('userId') userId: number,
  @Param('demandeId') demandeId: number, // Change the type to number
): Promise<void> {
  await this.userService.calculateSolde(userId, demandeId);
}



@UseGuards(AuthGuard)
@Patch(':id/maladie/:demandeId')
async calculateSoldeMaladie(@Param('id') userId: number , @Param('demandeId') demandeId: number,) {
  try {
    await this.userService.deductSoldeMaladie(userId , demandeId);
    return { message: 'Solde updated successfully' };
  } catch (error) {
    return { error: 'Failed to update solde' };
  }
}


@UseGuards(AuthGuard)
@Patch(':id/rec/:demandeId')
async calculateSoldeRec(@Param('id') userId: number , @Param('demandeId') demandeId: number,) {
  try {
    await this.userService.deductSoldeRec(userId , demandeId);
    return { message: 'Solde updated successfully' };
  } catch (error) {
    return { error: 'Failed to update solde' };
  }
}


@Get()
async findAll(): Promise<any[]> {
  return this.userService.findAll();
}

@Post('reset-solde-conge')
async resetSoldeConge(): Promise<void> {
  await this.userService.resetSoldeConge();
}








@UseGuards(AuthGuard)
@Delete(':id')
async deleteUserWithDemands(@Param('id') userId: number): Promise<void> {
  await this.userService.deleteUserWithDemands(userId);
}



@Post('compteur-solde')
async triggerCompteurSolde(): Promise<void> {
  await this.userService.manualCompteurSolde();
}

@Post('avatar')
@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file'))
async addAvatar(@Req() req : any, @UploadedFile() file: Express.Multer.File) {
  const user: User = req.user;
  return this.userService.addAvatar(req.user.id, file.buffer, file.originalname);
}

}


