import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor() {
    super();
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
    };

    done(null, user);
  }
}
