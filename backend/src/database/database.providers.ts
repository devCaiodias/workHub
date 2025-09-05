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
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Project, Task, RevokedToken],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
