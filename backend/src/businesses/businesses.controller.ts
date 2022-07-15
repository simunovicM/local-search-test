import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { Business } from './businesses.model';
import { BusinessesService } from './businesses.service';
import {
  BusinessViewModel,
  BusinessDetailViewModel,
} from './mappers/businesses.view.model';

@Controller('api/businesses')
export class BusinessesController {
  constructor(
    private readonly businessesService: BusinessesService,
    @InjectMapper() private readonly mapper: Mapper,
  ) { }

  @Get()
  getBusinesses(@Query('searchText') searchText: string): BusinessViewModel[] {
    var businesses = this.businessesService.getBusinesses(searchText);
    return this.mapper.mapArray(businesses, Business, BusinessViewModel);
  }

  @Get(':id')
  getBusiness(@Param('id') id: string): BusinessDetailViewModel {
    const business = this.businessesService.getBusiness(id);

    if (!business) throw new NotFoundException('Business not found!');

    return this.mapper.map(business, Business, BusinessDetailViewModel);
  }
}
