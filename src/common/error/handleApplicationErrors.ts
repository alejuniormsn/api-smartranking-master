import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common/exceptions";
import { Logger } from "@nestjs/common";

interface ExtendedError extends Error {
  parent?: string;
}

export interface CustomError {
  status: number;
  message: string;
  response?: any;
}

const logger = new Logger("ApplicationErrorHandler");

export const handleApplicationErrors = (
  error: unknown,
  metadata?: Record<string, any>
) => {
  const err = error as ExtendedError;

  logger.error(
    `Exception: ${err?.name}. Message: ${err?.parent}. Metadata: ${JSON.stringify(metadata)}`,
    error instanceof Error ? error.stack : "No stack trace"
  );

  if (
    error instanceof NotFoundException ||
    error instanceof ForbiddenException
  ) {
    return error;
  }

  if (
    error === null ||
    error === undefined ||
    (typeof error === "object" && "status" in error && "message" in error)
  ) {
    return new InternalServerErrorException(
      (error as CustomError) ?? "Internal Server Error"
    );
  }

  if (error instanceof Error) {
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
