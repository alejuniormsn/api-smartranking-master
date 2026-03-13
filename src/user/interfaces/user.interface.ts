import { Role } from "../enums/role.enum";

export interface IUser {
  readonly id?: number;
  readonly cpf: string;
  readonly email: string;
  readonly nome: string;
  readonly password?: string;
  readonly role: Role;
  readonly active?: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
