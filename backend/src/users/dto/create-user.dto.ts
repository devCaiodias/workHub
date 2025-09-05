import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"


export class CreateUserDto {
    id!: number

    @IsString()
    @Length(3)
    fullname!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsNotEmpty()
    @Length(6)
    password!: string
}
