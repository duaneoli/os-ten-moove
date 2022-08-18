import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CompanyEntity } from './CompanyEntity'

@Entity({ name: 'company_address' })
export class CompanyAddressEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string

  @Column({ type: 'character varying', name: 'street_name' })
  streetName: string

  @Column({ type: 'character varying', name: 'street_number' })
  streetNumber: string

  @Column({ type: 'character varying', name: 'additional' })
  additional: string

  @Column({ type: 'character varying', name: 'district' })
  district: string

  @Column({ type: 'character varying', name: 'city' })
  city: string

  @Column({ type: 'character varying', name: 'state' })
  state: string

  @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: string

  @OneToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity
}
