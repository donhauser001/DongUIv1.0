import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return 'Dong-FullStack API is running with AI Vector Support!';
  }

  @Get('status')
  async getStatus() {
    // 简单的健康检查，确认数据库连接
    const userCount = await this.prisma.user.count();
    return { status: 'ok', database: 'connected', userCount };
  }
}

