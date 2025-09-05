import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { Task } from '../task/entities/task.entity';
import * as dotenv from 'dotenv'
import { RevokedToken } from '../auth/revoked-token.entity';

dotenv.config()

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DB_CONFIG,
        entities: [User, Project, Task, RevokedToken],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
