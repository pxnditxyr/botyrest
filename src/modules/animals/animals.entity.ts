import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Animal {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string
  
  @Column({ type: 'text' })
  name: string

  @Column({ type: 'int', width: 4 })
  age: number

  @Column({ type: 'text' })
  breed: string

  @Column({ type: 'text' })
  type: string

  @Column({ type: 'float' })
  weight: number

  @Column({ type: 'text' })
  color: string

  @Column({ type: 'int', width: 2 })
  numberOfLegs: number

  @Column({ type: 'boolean' })
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
