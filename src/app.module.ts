import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
