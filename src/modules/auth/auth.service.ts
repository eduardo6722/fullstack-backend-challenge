import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as config from 'config';
import { User } from 'src/entities';
import { AuthDataDto } from './dto/auth.dto';
import { AccessToken } from 'src/interfaces';

const { secret } = config.get('jwt');

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async findUser(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async signup({ email, password }: AuthDataDto): Promise<AccessToken> {
    let user = await this.userRepository.findOne({ email });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    user = await this.userRepository.save(newUser);

    const payload = {
      id: user.id,
    };

    const accessToken = this.jwtService.sign(payload, { secret });

    return {
      accessToken,
    };
  }

  public async signin({ email, password }: AuthDataDto): Promise<AccessToken> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Verify your credentials');
    }

    const accessToken = this.jwtService.sign({ id: user.id }, { secret });

    return { accessToken };
  }
}
