import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskProviders } from './task.providers';
import { DatabaseModule } from 'src/database/database.module';
import { projectProviders } from 'src/project/project.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, ...TaskProviders, ...projectProviders]
})
export class TaskModule {}
