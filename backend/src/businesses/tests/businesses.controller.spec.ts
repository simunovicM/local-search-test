import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { BusinessesController } from '../businesses.controller';
import { Business } from '../businesses.model';
import { BusinessesService } from '../businesses.service';
import { BusinessesProfile } from '../mappers/businesses.profile';
import * as businessesData from './businesses.json';
import { BusinessDetailViewModel } from '../mappers/businesses.view.model';
import '../../libraries/extensions';
import { NotFoundException } from '@nestjs/common';

describe('Businesses Controller', () => {
  let controller: BusinessesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      controllers: [BusinessesController],
      providers: [BusinessesProfile, BusinessesService],
    }).compile();
    controller = app.get<BusinessesController>(BusinessesController);

    const service = app.get<BusinessesService>(BusinessesService);
    service.businesses = businessesData.map(f => new Business(f));
  });

  describe('BusinessesController.getBusinesses', () => {
    it('should return 2 businesses', () => {
      expect(controller.getBusinesses()).toHaveLength(2);
    });

    it('should return 1 businesses', () => {
      expect(controller.getBusinesses('rue')).toHaveLength(1);
    });

    it('should return no businesses', () => {
      expect(controller.getBusinesses('something')).toHaveLength(0);
    });
  });

  describe('BusinessesController.getBusiness', () => {
    it('should return business', () => {
      expect(controller.getBusiness('casa-ferlin')).toBeInstanceOf(BusinessDetailViewModel);
    });

    it('should return correct opening hours', () => {
      const business = controller.getBusiness('casa-ferlin');

      expect(business.openingHours).toHaveLength(2);

      expect(business.openingHours[0].days).toEqual('Monday - Friday');
      expect(business.openingHours[0].times.join('\n')).toEqual('11:30 - 14:00\n18:30 - 22:00');

      expect(business.openingHours[1].days).toEqual('Saturday - Sunday');
      expect(business.openingHours[1].times.join('\n')).toEqual('Closed');
    });

    it('should throw NotFoundException', () => {
      expect(() => controller.getBusiness('false-id')).toThrowError(NotFoundException);
    });
  });
});
