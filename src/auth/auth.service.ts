import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}
   
   async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        return new Promise((resolve, reject) => {
          bcrypt.compare(pass, user.password, (err, passwordMatches) => {
              if (err || !passwordMatches) {
                  reject(new UnauthorizedException('Invalid credentials'));
              } else {
                  // If the passwords match, return the user object without the password
                  const { password, ...result } = user;
                  resolve(result);
              }
          });
      });
    }
}
    

