import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('config')
@UseGuards(RolesGuard)
export class ConfigController {
  constructor(private readonly configService: ConfigService) { }

  // 配置读取可以公开访问（用于主题等）
  @Public()
  @Get(':key')
  async getConfig(@Param('key') key: string) {
    return this.configService.getConfig(key);
  }

  // 配置修改（开发阶段临时开放，生产环境建议需要管理员权限）
  @Public()
  @Post()
  async setConfig(@Body() body: { key: string; value: any; description?: string }) {
    return this.configService.setConfig(body.key, body.value, body.description);
  }
}

