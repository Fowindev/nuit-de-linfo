import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
})
export class AdminModule {}
