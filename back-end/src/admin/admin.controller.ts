import { Controller, ForbiddenException, Get, Headers } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('admin')
export class AdminController {
  constructor(private jwtService: JwtService) {}

  @Get()
  getGeneralInformations(@Headers('Authorization') authorization) {
    const token =
      typeof authorization === 'string'
        ? authorization.split(' ')[1]
        : undefined;

    if (token) {
      const content = this.jwtService.decode(token);

      if (
        typeof content === 'object' &&
        content.profileUrl &&
        content.profileUrl === process.env.ADMIN_PROFILE_URL
      ) {
        return 'Hello admin';
      }
    }

    throw new ForbiddenException();
  }
}
