import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from 'src/database/database.module';
import { projectProviders } from './project.providers';
import { AuthModule } from 'src/auth/auth.module'; // Importe o AuthModule
import { TaskProviders } from 'src/task/task.providers';

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
