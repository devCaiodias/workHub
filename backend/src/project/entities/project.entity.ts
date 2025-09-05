import { Task } from "../../task/entities/task.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    imgUrl!: string

    @CreateDateColumn()
    dateCreate!: Date

    @UpdateDateColumn()
    dateUpdate!: Date

    @OneToMany(() => Task, (task) => task.projeto, { cascade: true })
    tarefas!: Task[];

    @ManyToOne(() => User, (user) => user.projetos, { onDelete: 'CASCADE' })
    user!: User;
}
