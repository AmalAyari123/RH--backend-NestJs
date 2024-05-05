import { Controller , Post  , Body, HttpCode, HttpStatus, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuard } from './jwt-auth-guard';


@Controller('auth')
export class AuthController {
    constructor( private  authServices :  AuthService){}


 
 @Post('login')
  signIn(@Body() signInDto: AuthCredentialDto) :Promise<{accessToken : string}>  {
    return this.authServices.signIn(signInDto.email, signInDto.password);
  }

  
  


}

