import { Test, TestingModule } from '@nestjs/testing';
import { ChartController } from './chart.controller';

describe('ChartController', () => {
  let controller: ChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartController],
    }).compile();

    controller = module.get<ChartController>(ChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
