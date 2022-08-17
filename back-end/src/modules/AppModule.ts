import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Database } from 'src/configurations/Database'
import { CompanyController } from 'src/controllers/CompanyController'
import { CompanyAddressEntity } from 'src/entities/CompanyAddressEntity'
import { CompanyEntity } from 'src/entities/CompanyEntity'
import { CompanyService } from 'src/services/CompanyService'

@Module({
  imports: [Database, TypeOrmModule.forFeature([CompanyEntity, CompanyAddressEntity])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class AppModule {}
