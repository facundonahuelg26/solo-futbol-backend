import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ENVS } from 'src/environments'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('API Solo Fútbol')
    // .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())
  // app.enableCors({ origin: 'http://localhost:3000' })
  app.enableCors({ origin: ENVS.FRONTEND_URL })
  await app.listen(ENVS.PORT)
}
bootstrap()
