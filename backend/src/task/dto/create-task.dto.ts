
export enum TaskStatus {
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA',
}

export class CreateTaskDto {
    title: string
    description?: string
    status?: TaskStatus
    dataVencimento?: Date;
    projectId: number
}
