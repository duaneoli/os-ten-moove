import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { JoiPipe } from 'nestjs-joi'
import { CreateCompanyValidationDTO } from 'src/dtos/validation/Company/CreateCompanyDTO'
import { CompanyService } from 'src/services/CompanyService'

@Controller('company/')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('')
  async list() {
    return this.companyService.list()
  }

  @Get('/:id')
  async get() {
    return this.companyService.list()
  }

  @Post()
  async create(@Body(JoiPipe) body: CreateCompanyValidationDTO) {
    console.log(body)
    return 'create'
  }

  @Put()
  async update() {
    return 'update'
  }

  @Delete()
  async delete() {
    return 'delete'
  }
}
