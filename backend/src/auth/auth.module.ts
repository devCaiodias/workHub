import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from 'src/users/user.providers';

@Module({
  imports: [DatabaseModule, UsersModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
    signOptions: {expiresIn: '86400s'}
  })],
  controllers: [AuthController],
  providers: [...userProviders,AuthService],
})
export class AuthModule {}
