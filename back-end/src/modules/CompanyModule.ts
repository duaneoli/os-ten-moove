import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyAddressController } from 'src/controllers/CompanyAddresController'
import { CompanyController } from 'src/controllers/CompanyController'
import { CompanyAddressEntity } from 'src/entities/CompanyAddressEntity'
import { CompanyEntity } from 'src/entities/CompanyEntity'
import { PagerMiddleware } from 'src/middlewares/PagerMiddleware'
import { CompanyService } from 'src/services/CompanyService'
import { CompanyAddressService } from 'src/services/CompayAddressService'

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, CompanyAddressEntity])],
  controllers: [CompanyAddressController, CompanyController],
  providers: [CompanyService, CompanyAddressService],
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware).forRoutes({ path: '/company', method: RequestMethod.GET })
  }
}
