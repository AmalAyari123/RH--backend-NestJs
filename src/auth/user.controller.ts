
import { Body, Controller, Post , Get , Param, NotFoundException } from '@nestjs/common';
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

    @Get(':name')
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

}