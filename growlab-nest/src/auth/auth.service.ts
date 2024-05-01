import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  create(createAuthDto: CreateAuthDto) {
    this.authRepository.save(createAuthDto);
  }

  findAll() {
    return this.authRepository.find();
  }

  findOne(UUID: string) {
    return this.authRepository.findOneBy({ UUID });
  }

  update(UUID: string, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.update(UUID, updateAuthDto);
  }

  remove(UUID: string) {
    
  }

  async signIn(
    username: string, 
    pass: string
  ): Promise<{ access_token: string }> {
    console.log(username);
    const user = await this.userService.findOneByEmail(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    
    const authUser = await this.findOne(user.UUID);

    console.log(authUser.passHash);
    console.log(pass);

    if (authUser.passHash !== pass) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: authUser.UUID, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}