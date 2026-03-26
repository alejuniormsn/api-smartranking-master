import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn", "debug"],
  });
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
  console.log(
    "✅ The NestApplication is running on port: ",
    process.env.PORT || 3000
  );
}

bootstrap().catch((err) => {
  logger.error(
    "❌ Failed to bootstrap application: ",
    err instanceof Error ? err.stack : "No stack trace"
  );
  process.exit(1);
});
