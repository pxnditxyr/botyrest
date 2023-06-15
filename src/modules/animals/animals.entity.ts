import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Animal {
  @PrimaryGeneratedColumn( 'uuid' )
  id: string
  
  @Column( 'text',{ unique: true } )
  name: string

  @Column( 'int', { nullable: true } )
  age: number

  @Column( 'text', { nullable: true } )
  breed: string

  @Column( 'text', { nullable: true } )
  type: string

  @Column( 'float', { nullable: true } )
  weight: number

  @Column( 'text', { nullable: true } )
  color: string

  @Column( 'int', { nullable: true } )
  numberOfLegs: number

  @Column( 'boolean', { default: true } )
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  checkFields () {
    this.name = this.name.trim().toLowerCase()
  }

  @BeforeUpdate()
  checkOptionalFieldsBeforeUpdate () {
    this.checkFields()
  }
}
