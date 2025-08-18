import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly jwtService: JwtService

  @Inject('USER_REPOSITORY')
  private userRepository: Repository<User>

  async signin(email: string, password: string): Promise<{access_token: string}> {
    const user = await this.userRepository.findOne({where: {email}})
    if(!user) {
      throw new NotFoundException('User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentiais')
    }

    const payload = {sub: user.id, email: user.email}
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
