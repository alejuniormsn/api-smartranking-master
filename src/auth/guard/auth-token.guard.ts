import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "../config/jwt.config";
import * as config from "@nestjs/config";
import { JwtPayload } from "../interfaces/jwtPayload";
import { UserEntity } from "src/user/entities/user.entity";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,

    @Inject("USER_REPOSITORY")
    private userRepository: typeof UserEntity
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers?.authorization;
    if (!authHeader || typeof authHeader !== "string") {
      throw new UnauthorizedException("No token provided");
    }

    try {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException("No token provided");
      }

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtConfiguration.secret,
      });

      const user = await this.userRepository.findByPk(payload.sub);
      if (!user || user.active === false) {
        throw new Error("User not found");
      }

      request["user"] = { sub: payload.sub, role: payload.role };
      return true;
    } catch (error: any) {
      throw new BadRequestException(`Token error: ${(error as Error).message}`);
    }
  }
}
