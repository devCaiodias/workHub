import { Project } from "../../project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TaskStatus {
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA',
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column({ nullable: true })
    description?: string

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDENTE
    })
    status?: TaskStatus = TaskStatus.PENDENTE

    @Column({ type: 'date', nullable: true })
    dataVencimento?: Date = new Date();

    @CreateDateColumn()
    dateCreate!: Date;

    @UpdateDateColumn()
    dateUpdate!: Date

    @ManyToOne(() => Project, (project) => project.tarefas, { onDelete: 'CASCADE' })
    projeto!: Project;
}
