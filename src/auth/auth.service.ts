import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { HashingService } from "./hash/hashing.service";
import { UserEntity } from "src/user/entities/user.entity";
import { SignInDto } from "./dto/signIn.dto";
import { IUser } from "src/user/interfaces/user.interface";
import jwtConfig from "./config/jwt.config";
import * as config from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { handleDatabaseError } from "src/common/error/handleDatabaseError";

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,

    @Inject("USER_REPOSITORY")
    private userRepository: typeof UserEntity,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService
  ) {}

  async authenticate(signInDto: SignInDto) {
    try {
      const authUser = await this.userRepository.findOne({
        where: { email: signInDto.email, active: true },
      });
      if (!authUser) {
        throw new UnauthorizedException(`Invalid authentication`);
      }

      const isPasswordValid = this.hashingService.compare(
        signInDto.password,
        authUser.password
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException(`Invalid authentication`);
      }

      const token = await this.jwtService.signAsync(
        {
          sub: authUser.id,
          email: authUser.email,
          role: authUser.role,
        },
        {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.jwtTtl,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        }
      );

      const user: IUser = {
        ...authUser.toJSON(),
        password: undefined,
      };

      return { user, token };
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }
}
