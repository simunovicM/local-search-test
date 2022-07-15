/* istanbul ignore file */
declare global {
  interface Array<T> {
    first(fnc?: Function): T;
    last(fnc?: Function): T;
    any(fnc?: Function): boolean;
    groupBy(prop: Function | string): Array<{ key: string, items: Array<T> }>;
    sequentialGroupBy(prop: Function | string): Array<{ key: string, items: Array<T> }>;
    unique(prop?: Function | string): Array<T>;
  }
}

import { propToFnc } from '../common';

var enumerableProperties = {};
for (var enumKey in []) enumerableProperties[enumKey] = true; // eslint-disable-line
if (!Array.prototype.first) {
  Array.prototype.first = function (fnc?: Function) {
    return fnc ? this.find(fnc) : this[0];
  };
}
if (!Array.prototype.last) {
  Array.prototype.last = function (fnc?: Function) { // eslint-disable-line
    if (fnc) {
      for (var i = this.length; i >= 0; i--) {
        if (fnc(this[i])) return this[i];
      }
    } else return this[this.length - 1];
  };
}

if (!('any' in Array.prototype)) {
  Array.prototype.any = function (fnc?: Function) {
    if (fnc == null) return this.length > 0; // eslint-disable-line
    for (var i = 0; i < this.length; i++) {
      if (fnc(this[i])) return true;
    }
    return false;
  };
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function (prop: Function | string) {
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
  Array.prototype.sequentialGroupBy = function (prop: Function | string) {
    const propFnc = propToFnc(prop);
    return this.reduce((groups, item, ind) => {
      const val = propFnc(item, ind);
      if ((groups.last() || {}).key === val)
        groups.last().items.push(item);
      else groups.push({ key: val, items: [item] });
      return groups;
    }, []);
  };
}

if (!Array.prototype.unique) {
  Array.prototype.unique = function (prop?: Function | string) {
    return this.groupBy(prop)
      .filter(f => f != null) // eslint-disable-line
      .map(f => f.items.first());
  };
}

var noEnumerableProperties = {};
for (var key in []) { // eslint-disable-line
  if (!enumerableProperties[key]) noEnumerableProperties[key] = { enumerable: false };
}
Object.defineProperties(Array.prototype, noEnumerableProperties);