import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { HashingService } from "./hash/hashing.service";
import { DatabaseModule } from "src/database/database.module";
import { usersProviders } from "src/user/entities/user.providers";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, HashingService, ...usersProviders],
  exports: [HashingService, JwtModule, ConfigModule],
})
export class AuthModule {}
