import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Database } from 'src/configurations/DatabaseConfiguration'
import { CompanyController } from 'src/controllers/CompanyController'
import { CompanyAddressEntity } from 'src/entities/CompanyAddressEntity'
import { CompanyEntity } from 'src/entities/CompanyEntity'
import { PagerMiddleware } from 'src/middlewares/PagerMiddleware'
import { CompanyService } from 'src/services/CompanyService'

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, CompanyAddressEntity])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware).forRoutes({ path: '/company', method: RequestMethod.GET })
  }
}
