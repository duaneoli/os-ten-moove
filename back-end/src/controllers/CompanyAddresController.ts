import { UseFilters, Controller, Get, Query, HttpException, HttpStatus, Param, ParseUUIDPipe, Patch, Body } from '@nestjs/common'
import { JoiPipe } from 'nestjs-joi'
import { ResponseDTO } from 'src/dtos/ResponseDTO'
import { UpdateCompanySingleValidationDTO } from 'src/dtos/validation/Company/UpdateCompanySingleValidationDTO'
import { ListCompanyAddressValidationDTO } from 'src/dtos/validation/CompanyAddress/ListCompanyValidationDTO'
import { UpdateCompanyAddressSingleValidationDTO } from 'src/dtos/validation/CompanyAddress/UpdateCompanySingleValidationDTO'
import { CustomExceptionFilter } from 'src/filters/CustomExceptionFilter'
import { CompanyAddressService } from 'src/services/CompayAddressService'

@UseFilters(new CustomExceptionFilter())
@Controller('company/address')
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}
  @Get('')
  async list(@Query(JoiPipe) query: ListCompanyAddressValidationDTO) {
    let response: any
    try {
      response = await this.companyAddressService.list(query)
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company address retrieved', response, query)
  }

  @Get('/:companyId')
  async get(@Param('companyId', ParseUUIDPipe) companyId: string) {
    let response: any
    try {
      response = await this.companyAddressService.get(companyId)
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company addres retrieved', response)
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body(JoiPipe) body: UpdateCompanyAddressSingleValidationDTO) {
    let response: any
    try {
      response = await this.companyAddressService.update({ id, ...body })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.OK, 'Company created', response)
  }
}
