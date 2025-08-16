import { Task } from "src/task/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description?: string

    @CreateDateColumn()
    dateCreate: Date

    @UpdateDateColumn()
    dateUpdate: Date

    @OneToMany(() => Task, (task) => task.projeto, { cascade: true })
    tarefas: Task[];

    @ManyToOne(() => User, (user) => user.projetos, { onDelete: 'CASCADE' })
    user: User;
}
