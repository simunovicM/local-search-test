import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import {
  Address,
  AddressWhere,
  Business,
  AddressContact,
  DaysOfWeek,
} from 'src/businesses/businesses.model';
import {
  BusinessViewModel,
  BusinessDetailViewModel,
  AddressViewModel,
  AddressWhereViewModel,
  AddressContactViewModel,
} from 'src/businesses/mappers/businesses.view.model';

const groupTimes = (times: Array<{ start: string; end: string }>): string[] =>
  times.any() ? times.map((f) => `${f.start} - ${f.end}`) : ['Closed'];

@Injectable()
export class BusinessesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Business, BusinessViewModel,
        forMember(f => f.displayedWhat, mapFrom(source => source.displayed_what)),
        forMember(f => f.displayedWhere, mapFrom(source => source.displayed_where)),
      );

      createMap(
        mapper,
        Business,
        BusinessDetailViewModel,
        forMember(f => f.displayedWhat, mapFrom(source => source.displayed_what)),
        forMember(f => f.displayedWhere, mapFrom(source => source.displayed_where)),
        forMember(
          (f) => f.openingHours,
          mapFrom((source) => {
            const daysOfWeek = Object.values(DaysOfWeek);

            return daysOfWeek
              .sequentialGroupBy((f) =>
                groupTimes(source.opening_hours.days[f] || []).join('\n'),
              )
              .map((f) => ({
                days: [f.items.first(), f.items.last()]
                  .unique()
                  .map((f) => f.capitalize())
                  .join(' - '),
                times: groupTimes(
                  source.opening_hours.days[f.items.first()] || [],
                ),
              }));
          }),
        ),
      );

      createMap(mapper, Address, AddressViewModel);
      createMap(
        mapper,
        AddressWhere,
        AddressWhereViewModel,
        forMember(
          (f) => f.fullAddress,
          mapFrom((source) => {
            const { street, house_number, zipcode, city } = source;
            return [
              [street, house_number],
              [zipcode, city],
            ]
              .map((f) => f.join(' '))
              .filter((f) => f)
              .join(', ');
          }),
        ),
      );

      createMap(
        mapper,
        AddressContact,
        AddressContactViewModel,
        forMember(f => f.contactType, mapFrom(source => source.contact_type)),
        forMember(f => f.formattedServiceCode, mapFrom(source => source.formatted_service_code)),
        forMember(
          (f) => f.link,
          mapFrom((source) => source.call_link || source.service_code),
        ),
      );
    };
  }
}
