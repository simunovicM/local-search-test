/* istanbul ignore file */
declare global {
  interface Array<T> {
    first(fnc?: (item) => any): T;
    last(fnc?: (item) => any): T;
    any(fnc?: (item) => any): boolean;
    groupBy(
      prop: (item) => any | string,
    ): Array<{ key: string; items: Array<T> }>;
    sequentialGroupBy(
      prop: (item) => any | string,
    ): Array<{ key: string; items: Array<T> }>;
    unique(prop?: (item) => any | string): Array<T>;
  }
}

import { propToFnc } from '../common';

const enumerableProperties = {};
for (var enumKey in []) enumerableProperties[enumKey] = true; // eslint-disable-line
if (!Array.prototype.first) {
  Array.prototype.first = function (fnc?: (item) => any) {
    return fnc ? this.find(fnc) : this[0];
  };
}
if (!Array.prototype.last) {
  Array.prototype.last = function (fnc?: (item) => any) { // eslint-disable-line
    if (fnc) {
      for (let i = this.length; i >= 0; i--) {
        if (fnc(this[i])) return this[i];
      }
    } else return this[this.length - 1];
  };
}

if (!('any' in Array.prototype)) {
  Array.prototype.any = function (fnc?: (item) => any) {
    if (fnc == null) return this.length > 0; // eslint-disable-line
    for (let i = 0; i < this.length; i++) {
      if (fnc(this[i])) return true;
    }
    return false;
  };
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function (prop: (item) => any | string) {
    const propFnc = propToFnc(prop);
    return this.reduce((groups, item) => {
      const val = propFnc(item);
      const find = groups.find(f => f.key == val); // eslint-disable-line
      if (find != null) find.items.push(item); // eslint-disable-line
      else groups.push({ key: val, items: [item] });
      return groups;
    }, []);
  };
}

if (!Array.prototype.sequentialGroupBy) {
  Array.prototype.sequentialGroupBy = function (prop: (item) => any | string) {
    const propFnc = propToFnc(prop);
    return this.reduce((groups, item, ind) => {
      const val = propFnc(item, ind);
      if ((groups.last() || {}).key === val) groups.last().items.push(item);
      else groups.push({ key: val, items: [item] });
      return groups;
    }, []);
  };
}

if (!Array.prototype.unique) {
  Array.prototype.unique = function (prop?: (item) => any | string) {
    return this.groupBy(prop)
      .filter(f => f != null) // eslint-disable-line
      .map((f) => f.items.first());
  };
}

const noEnumerableProperties = {};
for (var key in []) { // eslint-disable-line
  if (!enumerableProperties[key])
    noEnumerableProperties[key] = { enumerable: false };
}
Object.defineProperties(Array.prototype, noEnumerableProperties);
