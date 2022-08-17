import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CompanyEntity } from 'src/entities/CompanyEntity'
import { Repository } from 'typeorm'

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>) {}

  async list() {
    return this.companyRepository.find()
  }
}
