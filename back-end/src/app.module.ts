import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RescuesModule } from './rescues/rescues.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    RescuesModule,
    AuthModule,
    AdminModule,
    PeopleModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
