import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './User.module';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';


import { jwtConstants } from './constant';
import { UserRepository } from './UserRepository';
import { DepartementModule } from 'src/departement/departement.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role.guard';



@Module({
  imports: [UsersModule , 
    DepartementModule,
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '30d', 
      },

    
      
    }),
  
 
  ],



  controllers: [AuthController],
  providers: [AuthService  , 
    ],
  exports :[
     
    PassportModule 
  ],
})
export class AuthModule {}
