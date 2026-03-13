import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { usersProviders } from "./entities/user.providers";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
