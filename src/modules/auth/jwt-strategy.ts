import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as config from 'config';

import { User } from 'src/entities';
import { AuthService } from './auth.service';

const { secret: secretOrKey } = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || secretOrKey,
    });
  }

  async validate(payload: any): Promise<User> {
    const { id } = payload;
    const user = await this.authService.findUser(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
