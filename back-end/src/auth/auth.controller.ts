import { Controller, Get, Headers, Req, Res, UseGuards } from '@nestjs/common';
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
  loginWithGithubCallback(
    @Req() request,
    @Res({ passthrough: true }) response,
  ) {
    response.cookie('auth-token', request.user.token, {
      domain: 'localhost',
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  @Get('user')
  getUser(@Req() request) {
    return this.jwtService.decode(request.cookies['auth-token']);
  }
}
