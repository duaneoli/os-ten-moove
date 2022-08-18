import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

export const Database: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.AUTHENTICATION_DB_HOST,
  port: Number(process.env.AUTHENTICATION_DB_PORT),
  username: process.env.AUTHENTICATION_DB_USER,
  password: process.env.AUTHENTICATION_DB_PASSWORD,
  database: process.env.AUTHENTICATION_DB_NAME,
  entities: ['dist/entities/*{.ts,.js}'],
  logging: process.env.AUTHENTICATION_DB_DEBUG ? true : false,
})
