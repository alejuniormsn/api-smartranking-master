import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
} from "class-validator";
import { Role } from "../enums/role.enum";

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3)
  nome: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
