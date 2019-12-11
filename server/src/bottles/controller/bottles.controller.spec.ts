import { Test, TestingModule } from '@nestjs/testing';
import { BottlesController } from './bottles.controller';

describe('Bottles Controller', () => {
  let controller: BottlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BottlesController],
    }).compile();

    controller = module.get<BottlesController>(BottlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
