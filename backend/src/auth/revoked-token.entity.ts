import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RevokedToken {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  token!: string

  @CreateDateColumn()
  createdAt!: Date

  @Column({ type: 'timestamptz' })
  expiresAt!: Date
}
