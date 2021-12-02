import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('state')
  getState(): { success: boolean } {
    return {
      success: true,
    };
  }
}
