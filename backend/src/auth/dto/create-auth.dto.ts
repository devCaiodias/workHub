import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    password!: string
}
