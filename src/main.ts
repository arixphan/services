import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
const port = process.env.PORT || 8081;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api/v1", { exclude: ["cats"] });

  const config = new DocumentBuilder()
    .setTitle("GIDO Services")
    .setDescription("The GIDO Services API description")
    .setVersion("1.0")
    .addTag("GIDO")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
