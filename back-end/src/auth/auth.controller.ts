import { Controller, Get, Headers, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';
import { GithubAuthGuard } from './guards/github.guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Public()
  @Get('github')
  @UseGuards(GithubAuthGuard)
  redirectToGithubAuth() {
    return;
  }

  @Public()
  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  loginWithGithubCallback(@Req() request) {
    return request.user;
  }

  @Get('user')
  getUser(@Headers('Authorization') authorization) {
    const token =
      typeof authorization === 'string'
        ? authorization.split(' ')[1]
        : undefined;

    return this.jwtService.decode(token);
  }
}
