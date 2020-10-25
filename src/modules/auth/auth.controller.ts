import { Body, Controller, Post } from '@nestjs/common';
import { AccessToken } from 'src/interfaces';
import { AuthService } from './auth.service';
import { AuthDataDto } from './dto/auth.dto';
import { AuthValidatorPipe } from './pipes/auth-validator.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(
    @Body(AuthValidatorPipe) data: AuthDataDto,
  ): Promise<AccessToken> {
    return this.authService.signin(data);
  }

  @Post('signup')
  async signup(
    @Body(AuthValidatorPipe) data: AuthDataDto,
  ): Promise<AccessToken> {
    return this.authService.signup(data);
  }
}
