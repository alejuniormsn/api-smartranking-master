import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

export class NotEmptyPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!value) {
      throw new BadRequestException(`Param ${metadata.data} is required`);
    }
    return value;
  }
}
