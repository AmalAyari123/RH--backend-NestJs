
import { Body, Controller, Post , Get , Param, NotFoundException, ParseIntPipe , Delete , Patch} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

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
            CompanyGroup: string;
            SoldeConge: number;
            Solde1: number;
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
@Patch('name/:id')
async updateUserName(@Param('id' , ParseIntPipe) id: number, @Body('name') newName: string): Promise<User> {
    return this.userService.updateUserName(id, newName);
}

@Patch('email/:id')
async updateUserEmail(@Param('id' , ParseIntPipe) id: number, @Body('email') newEmail: string): Promise<User> {
    return this.userService.updateUserEmail(id, newEmail);
}
@Patch('NumTel/:id')
async updateUserNumTel(@Param('id' , ParseIntPipe) id: number, @Body('NumTel') newNumTel: number): Promise<User> {
    return this.userService.updateUserNumTel(id, newNumTel);
}
@Patch('NumCIN/:id')
async updateUserNumCIN(@Param('id' , ParseIntPipe) id: number, @Body('NumCIN') newNumCIN: number): Promise<User> {
    return this.userService.updateUserNumCIN(id, newNumCIN);
}
@Patch('SoldeConge/:id')
async updateUserSoldeConge(@Param('id' , ParseIntPipe) id: number, @Body('SoldeConge') newSoldeConge: number): Promise<User> {
    return this.userService.updateUserSoldeConge(id, newSoldeConge);
}
@Patch('Solde1/:id')
async updateUserSolde(@Param('id' , ParseIntPipe) id: number, @Body('Solde1') newSolde: number): Promise<User> {
    return this.userService.updateUserSoldeConge(id, newSolde);
}


@Patch('profilePic/:id')
async updateProfilePic(
    @Param('id' , ParseIntPipe) id: number,
    @Body('profilePic') profilePic: string
): Promise<User> {
    return this.userService.updateProfilePic(id, profilePic);
}

@Get()
async findAll(): Promise<any[]> {
  return this.userService.findAll();
}
}


