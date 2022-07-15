import { AutoMap } from "@automapper/classes";
import { ContactType } from "src/businesses/businesses.model";

export class BusinessViewModel {
  @AutoMap()
  id: string;
  @AutoMap()
  displayed_what: string;
  @AutoMap()
  displayed_where: string;
}

export class BusinessDetailViewModel {
  @AutoMap()
  id: string;
  @AutoMap(() => AddressViewModel)
  addresses: AddressViewModel[];
  @AutoMap()
  displayed_what: string;
  @AutoMap()
  displayed_where: string;
  @AutoMap(() => Array)
  opening_hours: any[];
}

export class AddressContactViewModel {
  @AutoMap()
  contact_type: ContactType;
  @AutoMap()
  formatted_service_code: string;
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