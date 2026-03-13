import { IsNumber, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { IsEnum } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  order: string;
}
