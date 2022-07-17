import { AutomapperModule } from '@automapper/nestjs';
import { BusinessesProfile } from './mappers/businesses.profile';
import { classes } from '@automapper/classes';
import { Module } from '@nestjs/common';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [BusinessesController],
  providers: [BusinessesProfile, BusinessesService],
})
export class BusinessesModule { }
