import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './core/config/swagger.config';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  // const seeder = app.get(SeedService);
  // await seeder.seedData();
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
