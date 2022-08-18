import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Console } from 'console'
import { ExceptionDTO } from 'src/dtos/ExceptionDTO'
import { RejectedInputDTO } from 'src/dtos/RejectedInputDTO'
import { ServiceResponseDTO } from 'src/dtos/ServiceResponseDTO'
import { ListCompanyValidationDTO } from 'src/dtos/validation/Company/ListCompanyValidationDTO'
import { CompanyAddressEntity } from 'src/entities/CompanyAddressEntity'
import { CompanyContactEntity } from 'src/entities/CompanyContactEntity'
import { CompanyEntity } from 'src/entities/CompanyEntity'
import { ErrorCode } from 'src/helpers/ErrorCode'
import { parseWhere } from 'src/helpers/FilterByDate'
import { CreateCompanyType } from 'src/types/company/CreateCompanyType'
import { DeleteCompanyType } from 'src/types/company/DeleteCompanyType'
import { UpdateCompanyType } from 'src/types/company/UpdateCompanyType'
import { Connection, In, Repository } from 'typeorm'

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>, private readonly connection: Connection) {}

  private async findByDocument(documents: Array<string>) {
    return this.companyRepository.findBy(documents.map((it) => ({ document: it })))
  }

  async list(query: ListCompanyValidationDTO) {
    const where = parseWhere(query.filters, query.search)
    const { includes, page, pageSize, sortBy } = query
    const [response, count] = await this.companyRepository.findAndCount({ where: where, relations: includes, skip: page, take: pageSize, order: sortBy })
    return new ServiceResponseDTO(response, count)
  }

  async get(id: string) {
    const entity = await this.companyRepository.findOneBy({ id })

    if (!entity) throw ExceptionDTO.warn('No retrieved company', 'Entity not found in database', [new RejectedInputDTO(id, 'Entity not found', ErrorCode.ENTITY_NOT_FOUND)])

    return new ServiceResponseDTO([entity], 1)
  }

  async create(soft: boolean, createCompanys: Array<CreateCompanyType>) {
    const entitiesInDatabase = await this.findByDocument(createCompanys.map((it) => it.document))
    const rejectedInputs = Array<RejectedInputDTO>()
    const processedEntities = Array<CreateCompanyType>()

    createCompanys.forEach((it) => {
      if (entitiesInDatabase.some((entity) => entity.document == it.document)) rejectedInputs.push(new RejectedInputDTO(it.document, 'Document already in database', ErrorCode.DOCUMENT_ALREADY))
      else processedEntities.push(it)
    })

    if (!soft && rejectedInputs.length > 0) throw ExceptionDTO.warn('Company not created', 'Some document already exists', rejectedInputs)

    const company = await this.companyRepository.save(processedEntities, { reload: true })

    return new ServiceResponseDTO(company, company.length, null, rejectedInputs)
  }

  async delete(soft: boolean, deleteCompanys: Array<DeleteCompanyType>) {
    const entitiesInDatabase = await this.companyRepository.findBy(deleteCompanys)
    const rejectedInputs = Array<RejectedInputDTO>()
    const processedEntities = Array<DeleteCompanyType>()

    deleteCompanys.forEach((it) => {
      if (entitiesInDatabase.some((entity) => entity.id == it.id)) processedEntities.push(it)
      else rejectedInputs.push(new RejectedInputDTO(it.id, 'Id not found in database', ErrorCode.ENTITY_NOT_FOUND))
    })

    if (!soft && rejectedInputs.length > 0) throw ExceptionDTO.warn('Company no deleted', 'Some id not found in database', rejectedInputs)

    if (processedEntities.length > 0)
      await this.connection.transaction(async (manager) => {
        const ids = processedEntities.map((it) => it.id)
        const where = { companyId: In(ids) }

        manager.createQueryBuilder().delete().from(CompanyContactEntity).where(where).execute()
        manager.createQueryBuilder().delete().from(CompanyAddressEntity).where(where).execute()
        manager.createQueryBuilder().delete().from(CompanyEntity).whereInIds(ids).execute()
      })

    return new ServiceResponseDTO([], 0, null, rejectedInputs)
  }

  async update(soft: boolean, updateCompanys: Array<UpdateCompanyType>) {
    const entitiesCompany = await this.companyRepository.find({ where: updateCompanys.map((it) => ({ id: it.id })) })
    const rejectedInputs = Array<RejectedInputDTO>()
    const processedEntities = Array<CompanyEntity>()

    updateCompanys.forEach((entity) => {
      const update = entitiesCompany.find((it) => it.id == entity.id)
      if (!update) {
        rejectedInputs.push(new RejectedInputDTO(entity.id, 'Entity not found in database', ErrorCode.ENTITY_NOT_FOUND))
      } else {
        if (entity.companyName) update.companyName = entity.companyName
        if (entity.tradingName) update.tradingName = entity.tradingName
        if (entity.document) update.document = entity.document
      }
    })

    if (!soft && rejectedInputs.length > 0) throw ExceptionDTO.warn('Company no updated', 'Some entities not found in database', rejectedInputs)

    const documents = updateCompanys.filter((it) => it.document).map((it) => it.document)
    if (documents.length > 0) {
      const entitiesWithDocuments = await this.findByDocument(documents)
      entitiesCompany.forEach((entity) => {
        if (entitiesWithDocuments.some((it) => it.document == entity.document && it.id != entity.id))
          rejectedInputs.push(new RejectedInputDTO(entity.id, 'Document already in databse', ErrorCode.DOCUMENT_ALREADY))
        else processedEntities.push(entity)
      })
    } else entitiesCompany.forEach((it) => processedEntities.push(it))
    if (!soft && rejectedInputs.length > 0) throw ExceptionDTO.warn('Company no updated', 'Some documents already in database', rejectedInputs)

    const entitiesSave = await this.companyRepository.save(processedEntities, { reload: true })

    return new ServiceResponseDTO(entitiesSave, entitiesSave.length, null, rejectedInputs)
  }
}
