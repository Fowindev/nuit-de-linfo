import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('state')
  getState(): { success: boolean } {
    return {
      success: true,
    };
  }
}
