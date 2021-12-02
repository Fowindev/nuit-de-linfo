import { Test, TestingModule } from '@nestjs/testing';
import { LifeguardsController } from './lifeguards.controller';
import { LifeguardsService } from './lifeguards.service';

describe('LifeguardsController', () => {
  let controller: LifeguardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LifeguardsController],
      providers: [LifeguardsService],
    }).compile();

    controller = module.get<LifeguardsController>(LifeguardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
