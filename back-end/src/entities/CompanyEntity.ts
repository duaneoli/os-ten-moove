import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CompanyAddressEntity } from './CompanyAddressEntity'
import { CompanyContactEntity } from './CompanyContactEntity'

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ type: 'character varying', name: 'company_name' })
  companyName: string

  @Column({ type: 'character varying', name: 'trading_name' })
  tradingName: string

  @Column({ type: 'character varying', name: 'document' })
  document: string

  @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: string

  @OneToOne(() => CompanyAddressEntity, (companyAddressEntity) => companyAddressEntity.company, { onDelete: 'CASCADE', cascade: ['insert', 'update', 'remove'] })
  address: CompanyAddressEntity

  @OneToMany(() => CompanyContactEntity, (companyContactEntity) => companyContactEntity.company, { onDelete: 'CASCADE', cascade: ['insert', 'update', 'remove'] })
  contact: Array<CompanyContactEntity>

  constructor(companyName: string, tradingName: string, document: string) {
    this.companyName = companyName
    this.tradingName = tradingName
    this.document = document
  }
}
