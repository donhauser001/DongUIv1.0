import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ====== 安全配置 ======

  // 1. Helmet - 设置安全HTTP头
  app.use(helmet());

  // 2. CORS - 限制跨域访问
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:51730',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 3. 压缩响应
  // app.use(compression()); // 暂时注释，CommonJS导入问题

  // ====== 全局配置 ======

  // 4. 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动去除DTO中未定义的属性
      forbidNonWhitelisted: true, // 如果有未定义属性则抛出错误
      transform: true, // 自动类型转换
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 5. 全局JWT认证守卫
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // 6. 设置全局 API 前缀
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 50000;
  await app.listen(PORT, '0.0.0.0');

  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🔒 Security: Helmet, CORS, Rate Limiting enabled`);
}
bootstrap();
