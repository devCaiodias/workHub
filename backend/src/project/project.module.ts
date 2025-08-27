import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from 'src/database/database.module';
import { projectProviders } from './project.providers';
import { AuthModule } from 'src/auth/auth.module'; // Importe o AuthModule

@Module({
  imports: [
    DatabaseModule,
    AuthModule, // Adicione o AuthModule aqui para que suas dependências sejam resolvidas
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders],
  exports: [ProjectService],
})
export class ProjectModule {}
