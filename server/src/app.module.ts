import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '../../ormconfig'
import { getMetadataArgsStorage } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(config as PostgresConnectionOptions),
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
