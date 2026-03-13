import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common/exceptions";

interface ExtendedError extends Error {
  parent?: string;
}

export interface CustomError {
  status: number;
  message: string;
  response?: any;
}

export const handleDatabaseError = (
  error: unknown
):
  | BadRequestException
  | InternalServerErrorException
  | NotFoundException
  | UnauthorizedException => {
  if (error instanceof NotFoundException) return error;

  if (error instanceof UnauthorizedException) return error;

  if (error === null || error === undefined) {
    return new InternalServerErrorException("Internal Server Error");
  }

  if (typeof error === "object" && "status" in error && "message" in error) {
    return new InternalServerErrorException(error as CustomError);
  }

  if (error instanceof Error) {
    const err = error as ExtendedError;
    switch (err.name) {
      case "SequelizeConnectionRefusedError":
      case "SequelizeConnectionError":
        return new InternalServerErrorException("Database connection error");
      case "ConnectionRefusedError":
        return new InternalServerErrorException("Database not available");
      case "SequelizeDatabaseError":
        return new InternalServerErrorException(
          err.parent ? `${err.parent}` : "Database error, invalid syntax"
        );
      case "SequelizeUniqueConstraintError":
        return new BadRequestException(
          err.parent ? `${err.parent}` : "Unique constraint error"
        );
      case "SequelizeForeignKeyConstraintError":
        return new BadRequestException(
          err.parent ? `${err.parent}` : "Foreign key constraint error"
        );
      case "SequelizeEagerLoadingError":
        return new BadRequestException(
          err.parent ? `${err.parent}` : "Non-associated relationship"
        );
      default:
        return new InternalServerErrorException("Unknown database error");
    }
  }

  return new InternalServerErrorException("Internal Server Error");
};
