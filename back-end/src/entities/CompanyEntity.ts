import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'company' })
export class CompanyEntity {
  @PrimaryColumn({ type: 'uuid', name: 'id' })
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
}
