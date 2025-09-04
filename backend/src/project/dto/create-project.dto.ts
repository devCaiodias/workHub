import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateProjectDto {
    id: number

    @IsString()
    @Length(2)
    name: string

    @IsString()
    @IsNotEmpty()
    imgUrl: string
}
