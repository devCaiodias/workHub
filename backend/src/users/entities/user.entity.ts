import { Project } from "src/project/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 500 })
    fullname!: string

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @OneToMany(() => Project, (project) => project.user, { cascade: true })
    projetos!: Project[];

}
