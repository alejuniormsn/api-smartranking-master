import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PaginationDto } from "src/common/pagination/pagination.dto";
import { UserEntity } from "./entities/user.entity";
import { IUser } from "./interfaces/user.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { HashingService } from "src/auth/hash/hashing.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PayloadTokenDto } from "src/auth/dto/payload-token.dto";
import { CustomParamToken } from "src/auth/decorator/custom-param-token";
import { handleDatabaseError } from "src/common/error/handleDatabaseError";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: typeof UserEntity,
    private readonly hashingService: HashingService
  ) {}

  async findAll(): Promise<IUser[]> {
    try {
      const users = await this.userRepository.findAll({
        attributes: { exclude: ["password"] },
      });
      if (!users || users.length === 0) {
        throw new NotFoundException(`Not found "users"`);
      }
      return users;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async findAllV3(paginationDto?: PaginationDto): Promise<IUser[]> {
    try {
      const users = await this.userRepository.findAll({
        limit: paginationDto?.limit || 10,
        offset: paginationDto?.offset || 0,
        order: [["createdAt", paginationDto?.order || "ASC"]],
        attributes: { exclude: ["password", "role", "active"] },
      });
      if (!users || users.length === 0) {
        throw new NotFoundException(`Not found "users"`);
      }
      return users;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async findOne(
    id: number,
    @CustomParamToken() tokenPayload: PayloadTokenDto
  ): Promise<IUser> {
    try {
      const user = await this.userRepository.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw new NotFoundException(`Not found "user" with id ${id}`);
      }
      if (tokenPayload.sub !== id) {
        throw new UnauthorizedException(
          "Permission denied. You can only access your data!"
        );
      }
      return user;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async create(
    userDto: CreateUserDto,
    tokenPayload: PayloadTokenDto
  ): Promise<IUser> {
    if (tokenPayload.role !== "admin") {
      throw new UnauthorizedException(
        "Permission denied. You can only create users as admin!"
      );
    }
    try {
      const hashedPassword = this.hashingService.hash(userDto.password);
      const userWithoutPassword = await this.userRepository.create({
        ...userDto,
        password: hashedPassword,
      });
      const user: IUser = {
        ...userWithoutPassword.toJSON(),
        password: undefined,
      };
      return user;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    tokenPayload: PayloadTokenDto
  ): Promise<IUser> {
    if (tokenPayload.role !== "admin") {
      throw new UnauthorizedException(
        "Permission denied. You can only update users as admin!"
      );
    }
    if (tokenPayload.sub !== id) {
      throw new UnauthorizedException(
        "Access denied. You can only update your user!"
      );
    }
    try {
      let hashedPassword = updateUserDto.password;
      if (updateUserDto.password) {
        hashedPassword = this.hashingService.hash(updateUserDto.password);
      }
      const [affectedCount, [updatedUser]] = await this.userRepository.update(
        {
          ...updateUserDto,
          password: hashedPassword,
        },
        {
          where: { id },
          returning: true,
        }
      );
      if (affectedCount === 0) {
        throw new NotFoundException(`Not found "user" with id ${id}`);
      }
      const user: IUser = {
        ...updatedUser.toJSON(),
        password: undefined,
      };
      return user;
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }

  async remove(id: number, tokenPayload: PayloadTokenDto): Promise<object> {
    if (tokenPayload.role !== "admin") {
      throw new UnauthorizedException(
        "Permission denied. You can only delete users as admin!"
      );
    }
    if (tokenPayload.sub === id) {
      throw new UnauthorizedException(
        "Access denied. You cannot delete your user!"
      );
    }
    try {
      const deletedCount = await this.userRepository.destroy({
        where: { id },
      });
      if (deletedCount === 0) {
        throw new NotFoundException(`Not found "user" with id ${id}`);
      }
      return {
        message: `Successfully removed "user" with id ${id}`,
        success: true,
        statusCode: HttpStatus.OK,
      };
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }
}
