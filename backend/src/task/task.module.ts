import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskProviders } from './task.providers';
import { DatabaseModule } from '../database/database.module';
import { projectProviders } from '../project/project.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TaskController],
  providers: [TaskService, ...TaskProviders, ...projectProviders]
})
export class TaskModule {}
