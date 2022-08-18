import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, UseFilters } from '@nestjs/common'
import { JoiPipe } from 'nestjs-joi'
import { ResponseDTO } from 'src/dtos/ResponseDTO'
import { ServiceResponseDTO } from 'src/dtos/ServiceResponseDTO'
import { CreateCompanyValidationDTO } from 'src/dtos/validation/Company/CreateCompanyValidationDTO'
import { DeleteCompanyValidationDTO } from 'src/dtos/validation/Company/DeleteCompanyValidationDTO'
import { ListCompanyValidationDTO } from 'src/dtos/validation/Company/ListCompanyValidationDTO'
import { UpdateCompanySingleValidationDTO } from 'src/dtos/validation/Company/UpdateCompanySingleValidationDTO'
import { UpdateCompanyValidationDTO } from 'src/dtos/validation/Company/UpdateCompanyValidationDTO'
import { CompanyEntity } from 'src/entities/CompanyEntity'
import { CustomExceptionFilter } from 'src/filters/CustomExceptionFilter'
import { CompanyService } from 'src/services/CompanyService'

@UseFilters(new CustomExceptionFilter())
@Controller('company/')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('')
  async list(@Query(JoiPipe) query: ListCompanyValidationDTO) {
    let response: any
    try {
      response = await this.companyService.list(query)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company retrieved', response, query)
  }

  @Get('/:id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    let response: any
    try {
      response = await this.companyService.get(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company retrieved', response)
  }

  @Post()
  async create(@Body(JoiPipe) body: CreateCompanyValidationDTO) {
    let response: any
    try {
      response = await this.companyService.create(body.soft, body.data)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company created', response)
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body(JoiPipe) body: UpdateCompanySingleValidationDTO) {
    let response: any
    try {
      response = await this.companyService.update(false, [{ id, ...body }])
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company created', response)
  }

  @Patch('')
  async updateMany(@Body(JoiPipe) body: UpdateCompanyValidationDTO) {
    let response: any
    try {
      response = await this.companyService.update(body.soft, body.data)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company created', response)
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    let response: ServiceResponseDTO<CompanyEntity>
    try {
      response = await this.companyService.delete(false, [{ id }])
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.NO_CONTENT, 'Company deleted', response)
  }

  @Delete()
  async deleteMany(@Body(JoiPipe) body: DeleteCompanyValidationDTO) {
    let response: ServiceResponseDTO<CompanyEntity>
    try {
      response = await this.companyService.delete(body.soft, body.data)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.NO_CONTENT, 'Company deleted', response)
  }
}
