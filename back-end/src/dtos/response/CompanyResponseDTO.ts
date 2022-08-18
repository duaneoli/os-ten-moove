// import { PagedDataDTO } from 'guigotv-architecture/dtos/PagedDataDTO'
// import { BeneficiaryDTO } from '../BeneficiaryDTO'
// import { BeneficiaryServiceDTO } from '../service/BeneficiaryServiceDTO'
// import { ListValidationDTO } from '../validation/ListValidationDTO'

// export class BeneficiaryResponseDTO extends PagedDataDTO {
//   beneficiaries?: Array<BeneficiaryDTO>
//   transactions?: any

//   constructor(response: BeneficiaryServiceDTO, pagingMetadata?: ListValidationDTO) {
//     super(pagingMetadata ? pagingMetadata.page : undefined, pagingMetadata ? pagingMetadata.pageSize : undefined, pagingMetadata ? response.totalElements : undefined)
//     if (response.entities) this.beneficiaries = response.entities.map((it) => new BeneficiaryDTO(it))
//     if (response.transactions) this.transactions = { ...response.transactions }
//   }
// }
