import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExceptionDTO } from 'src/dtos/ExceptionDTO'
import { RejectedInputDTO } from 'src/dtos/RejectedInputDTO'
import { ServiceResponseDTO } from 'src/dtos/ServiceResponseDTO'
import { ListCompanyAddressValidationDTO } from 'src/dtos/validation/CompanyAddress/ListCompanyValidationDTO'
import { CompanyAddressEntity } from 'src/entities/CompanyAddressEntity'
import { ErrorCode } from 'src/helpers/ErrorCode'
import { parseWhere } from 'src/helpers/FilterByDate'
import { Repository, Connection, DeepPartial } from 'typeorm'

@Injectable()
export class CompanyAddressService {
  constructor(@InjectRepository(CompanyAddressEntity) private readonly companyAddressRepository: Repository<CompanyAddressEntity>, private readonly connection: Connection) {}

  async list(query: ListCompanyAddressValidationDTO) {
    const where = parseWhere(query.filters, query.search)
    const { includes, page, pageSize, sortBy } = query
    const [response, count] = await this.companyAddressRepository.findAndCount({ where: where, relations: includes, skip: page, take: pageSize, order: sortBy })
    return new ServiceResponseDTO(response, count)
  }

  async get(companyId: string) {
    const entity = await this.companyAddressRepository.findOneBy({ companyId })

    if (!entity) throw ExceptionDTO.warn('No retrieved company', 'Entity not found in database', [new RejectedInputDTO(companyId, 'Entity not found', ErrorCode.ENTITY_NOT_FOUND)])

    return new ServiceResponseDTO([entity], 1)
  }

  async update(entityDTO: DeepPartial<CompanyAddressEntity>) {
    const entity = await this.companyAddressRepository.findOneBy({ companyId: entityDTO.id })

    if (!entity) throw ExceptionDTO.warn('Company adress not update', 'Entity not found in database', [new RejectedInputDTO(entityDTO.id!, 'Entity not found', ErrorCode.ENTITY_NOT_FOUND)])

    if (entityDTO.streetName) entity.streetName = entityDTO.streetName
    if (entityDTO.streetNumber) entity.streetNumber = entityDTO.streetNumber
    if (entityDTO.additional) entity.additional = entityDTO.additional
    if (entityDTO.district) entity.district = entityDTO.district
    if (entityDTO.city) entity.city = entityDTO.city
    if (entityDTO.state) entity.state = entityDTO.state

    const entitySave = await this.companyAddressRepository.save(entity)

    return new ServiceResponseDTO([entitySave], 1)
  }
}
