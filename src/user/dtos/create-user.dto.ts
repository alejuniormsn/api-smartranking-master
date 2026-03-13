import { IsNotEmpty, IsEmail, MinLength, IsEnum } from "class-validator";
import { Role } from "src/user/enums/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(11)
  cpf: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
