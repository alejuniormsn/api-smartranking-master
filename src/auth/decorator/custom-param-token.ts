import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { PayloadTokenDto } from "../dto/payload-token.dto";

export const CustomParamToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PayloadTokenDto => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request["user"] as PayloadTokenDto;
  }
);
