type CreateAddressType = {
  streetName: string
  streetNumber: string
  additional: string
  district: string
  city: string
  state: string
}

type CreateContactType = {
  prefix: string
  phone: string
}

export type CreateCompanyType = {
  companyName: string
  tradingName: string
  document: string
  address: CreateAddressType
  contact: Array<CreateContactType>
}
