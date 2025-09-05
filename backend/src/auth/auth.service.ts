import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { RevokedToken } from './revoked-token.entity';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,

    @Inject('REVOKED_REPOSITORY')
    private revokedTokenRepository: Repository<RevokedToken>
  ) { }

  async signin(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  async revokeToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new UnauthorizedException('Token inválido.');
    }

    const { exp } = decodedToken;
    const expiresAt = new Date(exp * 1000);

    const revokedToken = this.revokedTokenRepository.create({
      token,
      expiresAt,
    });

    await this.revokedTokenRepository.save(revokedToken);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const revokedToken = await this.revokedTokenRepository.findOne({
      where: { token },
    });
    return !!revokedToken;
  }
}
