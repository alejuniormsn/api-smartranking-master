import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Param,
  Post,
  Put,
  Query,
  Version,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { IUser } from "./interfaces/user.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "src/common/pagination/pagination.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { CustomParamToken } from "src/auth/decorator/custom-param-token";
import { PayloadTokenDto } from "src/auth/dto/payload-token.dto";

@UseGuards(AuthTokenGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @CustomParamToken() tokenPayload: PayloadTokenDto
  ): Promise<IUser> {
    return this.userService.create(createUserDto, tokenPayload);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get()
  @Version("3")
  async findAllV3(@Query() paginationDto: PaginationDto): Promise<IUser[]> {
    return this.userService.findAllV3(paginationDto);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @CustomParamToken() tokenPayload: PayloadTokenDto
  ): Promise<IUser> {
    return this.userService.findOne(id, tokenPayload);
  }
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @CustomParamToken() tokenPayload: PayloadTokenDto
  ): Promise<IUser> {
    return this.userService.update(id, updateUserDto, tokenPayload);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @CustomParamToken() tokenPayload: PayloadTokenDto
  ): Promise<object> {
    return this.userService.remove(id, tokenPayload);
  }
}
