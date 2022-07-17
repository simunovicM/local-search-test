import { AutoMap } from '@automapper/classes';
import { ContactType } from '../businesses.model';

export class BusinessViewModel {
  @AutoMap()
  id: string;
  @AutoMap()
  displayedWhat: string;
  @AutoMap()
  displayedWhere: string;
}

export class BusinessDetailViewModel {
  @AutoMap()
  id: string;
  @AutoMap(() => AddressViewModel)
  addresses: AddressViewModel[];
  @AutoMap()
  displayedWhat: string;
  @AutoMap()
  displayedWhere: string;
  @AutoMap(() => Array)
  openingHours: Array<{ days: string; times: any[] }>;
}

export class AddressContactViewModel {
  @AutoMap()
  contactType: ContactType;
  @AutoMap()
  formattedServiceCode: string;
  link: string;
}

export class AddressWhereViewModel {
  fullAddress: string;
}

export class AddressViewModel {
  @AutoMap(() => AddressContactViewModel)
  contacts: AddressContactViewModel[];
  @AutoMap(() => AddressWhereViewModel)
  where: AddressWhereViewModel;
}
