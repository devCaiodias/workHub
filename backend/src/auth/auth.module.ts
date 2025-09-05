import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { revokedProviders } from './revoked.providers';
import { userProviders } from '../users/user.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule), // Importa o UsersModule com forwardRef
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    ...revokedProviders,
    ...userProviders,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
