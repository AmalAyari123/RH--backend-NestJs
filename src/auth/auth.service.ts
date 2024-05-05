import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { promisify } from 'util';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
      private jwtService: JwtService) {}
   
 


    async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
      const user = await this.usersService.getUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const compare = promisify(bcrypt.compare);
      const passwordMatches = await compare(pass, user.password);
  
      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
      }
   
  
      const payload = { name: user.name, email: user.email , id:user.id , userrole:user.userrole , DepartmentId : user.DepartmentId };
    
      const accessToken = this.jwtService.sign(payload);
  
      return {...user,
        accessToken,
      };
    }
    validateToken(token: string) {
      return this.jwtService.verify(token, {
          secret : process.env.JWT_SECRET_KEY
      });
  }
  }

    

