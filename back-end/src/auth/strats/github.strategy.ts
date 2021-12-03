import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Strategy } from 'passport-github';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private jwtService: JwtService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackUrl: process.env.GITHUB_CLIENT_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Strategy.Profile,
    done: VerifyCallback,
  ) {
    const { profileUrl } = profile;

    const user = {
      provider: 'github',
      profileUrl,
      accessToken,
      token: this.jwtService.sign(
        {
          provider: 'github',
          profileUrl,
          accessToken,
        },
        { secret: process.env.JWT_SECRET },
      ),
    };

    done(null, user);
  }
}
