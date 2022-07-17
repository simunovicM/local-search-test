import { AutomapperModule } from '@automapper/nestjs';
import { BusinessesProfile } from './mappers/businesses.profile';
import { classes } from '@automapper/classes';
import { Module } from '@nestjs/common';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';
import { BusinessesDataService } from './businesses.data.service';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [BusinessesController],
  providers: [BusinessesProfile, BusinessesService, BusinessesDataService],
})
export class BusinessesModule { }
