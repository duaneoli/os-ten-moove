import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Database } from 'src/configurations/DatabaseConfiguration'
import { CompanyController } from 'src/controllers/CompanyController'
import { CompanyAddressEntity } from 'src/entities/CompanyAddressEntity'
import { CompanyEntity } from 'src/entities/CompanyEntity'
import { CompanyService } from 'src/services/CompanyService'
import { CompanyModule } from './CompanyModule'

@Module({
  imports: [Database, CompanyModule],
})
export class AppModule {}
