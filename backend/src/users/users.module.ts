import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { AuthModule } from 'src/auth/auth.module'; // Importa o AuthModule

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule) // Usa forwardRef para resolver a dependência circular
  ],
  providers: [...userProviders, UsersService],
  controllers: [UsersController],
  exports: [UsersService] // Exporte o UsersService para que o AuthModule possa usá-lo
})
export class UsersModule {}
