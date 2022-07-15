import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import {
  BusinessViewModel,
  BusinessDetailViewModel,
} from './mappers/businesses.view.model';

@Controller('api/businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) { }

  @Get()
  getBusinesses(@Query('searchText') searchText: string): BusinessViewModel[] {
    return this.businessesService.getBusinesses(searchText);
  }

  @Get(':id')
  getBusiness(@Param('id') id: string): BusinessDetailViewModel {
    const business = this.businessesService.getBusiness(id);

    if (!business) throw new NotFoundException('Business not found!');

    return business;
  }
}
