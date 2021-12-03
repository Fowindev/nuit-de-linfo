import { Controller, Get, Render } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  @Render('index')
  getState() {
    return;
  }
}
