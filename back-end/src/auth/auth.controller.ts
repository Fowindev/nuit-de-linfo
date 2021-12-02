import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  @Get('/github')
  @UseGuards(AuthGuard('github'))
  redirectToGithubAuth() {
    return;
  }

  @Get('/github/callback')
  @UseGuards(AuthGuard('github'))
  loginWithGithubCallback(@Req() request) {
    return request;
  }
}
