import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
    prefix: "v",
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  await app.listen(Number(process.env.PORT) || 3000);
}

bootstrap().catch((err) => {
  logger.error(err instanceof Error ? err.stack : "No stack trace");
  process.exit(1);
});
