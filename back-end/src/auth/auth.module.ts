import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GithubStrategy } from './strats/github.strategy';
import { JwtStrategy } from './strats/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
