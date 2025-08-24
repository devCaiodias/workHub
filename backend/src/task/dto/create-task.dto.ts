import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export enum TaskStatus {
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA',
}

export class CreateTaskDto {
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    description?: string
    
    @IsOptional()
    status?: TaskStatus

    @IsOptional()
    @IsDate()
    dataVencimento?: Date;

    @IsNumber()
    projectId: number
}
