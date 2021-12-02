import { Module } from '@nestjs/common';
import { LifeguardsService } from './lifeguards.service';
import { LifeguardsController } from './lifeguards.controller';

@Module({
  controllers: [LifeguardsController],
  providers: [LifeguardsService]
})
export class LifeguardsModule {}
