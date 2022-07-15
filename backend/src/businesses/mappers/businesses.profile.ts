import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Address, AddressWhere, Business, AddressContact } from 'src/businesses/businesses.model';
import { BusinessViewModel, BusinessDetailViewModel, AddressViewModel, AddressWhereViewModel, AddressContactViewModel } from 'src/businesses/mappers/businesses.view.model';

@Injectable()
export class BusinessesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Business, BusinessViewModel);

      createMap(mapper, Business, BusinessDetailViewModel);

      createMap(mapper, Address, AddressViewModel);
      createMap(mapper, AddressWhere, AddressWhereViewModel,
        forMember(f => f.fullAddress, mapFrom(source => {
          const { street, house_number, zipcode, city } = source;
          return [
            [street, house_number],
            [zipcode, city]
          ]
            .map(f => f.join(' '))
            .filter(f => f)
            .join(', ');
        }))
      );

      createMap(mapper, AddressContact, AddressContactViewModel,
        forMember(f => f.link, mapFrom(source => source.call_link || source.service_code)));
      ;
    };
  }
}