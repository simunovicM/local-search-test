import { AutoMap } from "@automapper/classes";

export class Business {
  @AutoMap()
  id: string;
  @AutoMap(() => Address)
  addresses: Address[];
  @AutoMap()
  displayed_what: string;
  @AutoMap()
  displayed_where: string;
  @AutoMap(() => Array)
  opening_hours: any[];

  constructor({ id, addresses, displayed_what, displayed_where, opening_hours }) {
    this.id = id;
    this.addresses = addresses.map(f => new Address(f));
    this.displayed_what = displayed_what;
    this.displayed_where = displayed_where;
    this.opening_hours = opening_hours;
  }
}

export class AddressContact {
  @AutoMap()
  contact_type: ContactType;
  @AutoMap()
  formatted_service_code: string;
  service_code: string;
  call_link: string;

  constructor({ contact_type, formatted_service_code, service_code, call_link }) {
    this.contact_type = ContactType[contact_type.toUpperCase()];
    this.formatted_service_code = formatted_service_code;
    this.service_code = service_code;
    this.call_link = call_link;
  }
}

export enum ContactType {
  PHONE = 'phone',
  URL = 'url'
}

export class AddressWhere {
  @AutoMap()
  street: string;
  @AutoMap()
  house_number: string;
  @AutoMap()
  zipcode: number;
  @AutoMap()
  city: string;
  @AutoMap()
  state: string;

  constructor({ city, house_number, state, street, zipcode }) {
    this.street = street;
    this.house_number = house_number;
    this.zipcode = zipcode;
    this.city = city;
    this.state = state;
  }
}

export class Address {
  @AutoMap(() => AddressContact)
  contacts: AddressContact[];
  @AutoMap(() => AddressWhere)
  where: AddressWhere;

  constructor({ contacts, where }) {
    this.contacts = contacts.map(f => new AddressContact(f));
    this.where = new AddressWhere(where);
  }
}
