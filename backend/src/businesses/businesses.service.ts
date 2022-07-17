import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Business } from './businesses.model';

@Injectable()
export class BusinessesService {
  businesses: Business[] = [];
  constructor() {
    const ids = ['ohGSnJtMIC5nPfYRi_HTAg', 'GXvPAor1ifNfpF0U5PTG0w'];

    const crateId = (data) =>
      data.displayed_what.toLowerCase().split(' ').join('-');

    Promise.all(
      ids.map((id) =>
        axios.get(
          `https://storage.googleapis.com/coding-session-rest-api/${id}`,
        ),
      ),
    ).then(
      (response) =>
      (this.businesses = response.map(
        (f) => new Business({ ...f.data, id: crateId(f.data) }),
      )),
    );
  }

  checkBusinessesLoaded() {
    if (!this.businesses.length)
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  getBusinesses(searchText?: string): Business[] {
    this.checkBusinessesLoaded();

    const lowerCaseSearchText = (searchText || '').toLowerCase();
    const findBusinessByText = (business) =>
      [business.displayed_what, business.displayed_where]
        .find((g) => g.toLowerCase().includes(lowerCaseSearchText));

    return this.businesses
      .filter((f) => !searchText || findBusinessByText(f));
  }

  getBusiness(id: string): Business {
    this.checkBusinessesLoaded();

    return this.businesses.find((f) => f.id === id);
  }
}
