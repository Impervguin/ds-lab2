import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('manage/health')
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  check(): void {
    return;
  }
}
