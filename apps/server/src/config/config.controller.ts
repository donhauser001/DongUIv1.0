import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':key')
  async getConfig(@Param('key') key: string) {
    return this.configService.getConfig(key);
  }

  @Post()
  async setConfig(@Body() body: { key: string; value: any; description?: string }) {
    return this.configService.setConfig(body.key, body.value, body.description);
  }
}

