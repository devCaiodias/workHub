import { DataSource } from 'typeorm';
import { RevokedToken } from './revoked-token.entity';

export const revokedProviders = [
  {
    provide: 'REVOKED_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RevokedToken),
    inject: ['DATA_SOURCE'],
  },
];
