import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { HttpExecptionFilter } from './filters/http-execption.filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { uploadStaticSrc } from './config/upload/upload.config'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // 使用验证管道
  app.useGlobalPipes(new ValidationPipe())
  // 使用拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 使用异常过滤器
  app.useGlobalFilters(new HttpExecptionFilter())

  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: uploadStaticSrc
  })
  const options = new DocumentBuilder()
    .setTitle('blog-serve')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger-doc', app, document)

  await app.listen(3080)
}
bootstrap()
