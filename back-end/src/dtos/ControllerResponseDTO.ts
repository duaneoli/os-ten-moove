import { PagedDataDTO } from './PagedDataDTO'
import { ServiceResponseDTO } from './ServiceResponseDTO'

export class ControllerResponseDTO<T> extends PagedDataDTO {
  entities?: Array<T>
  constructor(response: ServiceResponseDTO<T>, pagingMetadata?: { page?: number; pageSize?: number }) {
    super(pagingMetadata ? pagingMetadata.page : undefined, pagingMetadata ? pagingMetadata.pageSize : undefined, pagingMetadata ? response.entitiesCount : undefined)
    if (response.entities) this.entities = response.entities
  }
}
