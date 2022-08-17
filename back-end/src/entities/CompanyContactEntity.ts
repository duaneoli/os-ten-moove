import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'company_contact' })
export class CompanyContactEntity {
  @PrimaryColumn({ type: 'uuid', name: 'id' })
  id: string

  @Column({ type: 'uuid', name: 'company_id' })
  companyId: string

  @Column({ type: 'character varying', name: 'prefix' })
  prefix: string

  @Column({ type: 'character varying', name: 'phone' })
  phone: string

  @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: string
}
