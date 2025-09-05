import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from '../database/database.module';
import { projectProviders } from './project.providers';
import { AuthModule } from '../auth/auth.module'; // Importe o AuthModule
import { TaskProviders } from '../task/task.providers';

@Module({
  imports: [
    DatabaseModule,
    AuthModule, // Adicione o AuthModule aqui para que suas dependências sejam resolvidas
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ...projectProviders, ...TaskProviders],
  exports: [ProjectService],
})
export class ProjectModule {}
