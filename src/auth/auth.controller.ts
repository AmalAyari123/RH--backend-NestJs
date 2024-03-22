import { Controller , Post  , Body, HttpCode, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor( private  authServices :  AuthService){}


  @HttpCode(HttpStatus.OK)
 @Post('login')
  signIn(@Body() signInDto: AuthCredentialDto) {
    return this.authServices.signIn(signInDto.email, signInDto.password);
  }

}

