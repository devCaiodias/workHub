import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateProjectDto {
    id: number

    @IsString()
    @Length(3)
    name: string

    @IsString()
    @IsOptional()
    description?: string
    
    @IsString()
    @IsNotEmpty()
    imgUrl: string
}
