import { Test, TestingModule } from '@nestjs/testing';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';

describe('AppController', () => {
  let controller: BusinessesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusinessesController],
      providers: [BusinessesService],
    }).compile();

    controller = app.get<BusinessesController>(BusinessesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(controller.getHello()).toBe('Hello World!');
    });
  });
});
