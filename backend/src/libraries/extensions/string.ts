/* istanbul ignore file */
declare global {
  interface String {
    capitalize(): string;
  }
}

import { isNullOrEmpty } from '../common'; // eslint-disable-line

if (!String.prototype.capitalize) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };
}
