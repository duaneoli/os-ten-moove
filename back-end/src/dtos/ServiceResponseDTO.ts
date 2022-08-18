import { RejectedInputDTO } from 'src/dtos/RejectedInputDTO'

export class ServiceResponseDTO<T> {
  transactions?: any
  entities?: Array<T>
  entitiesCount?: number
  rejectedInputs?: Array<RejectedInputDTO>

  constructor(entities?: Array<T>, entitiesCount?: number, transactions?: any, rejectedInputs?: Array<RejectedInputDTO>) {
    if (entities) this.entities = entities
    if (entitiesCount) this.entitiesCount = entitiesCount
    if (transactions) this.transactions = { ...transactions }
    if (rejectedInputs) this.rejectedInputs = rejectedInputs
  }
}
