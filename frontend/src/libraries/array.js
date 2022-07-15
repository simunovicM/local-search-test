/* istanbul ignore file */
import { propToFnc, isFunction } from './common';

var enumerableProperties = {};
for (var enumKey in []) enumerableProperties[enumKey] = true; // eslint-disable-line

if (!Array.prototype.remove) {
  Array.prototype.remove = function (dat) {
    const ind = this.indexOf(dat);
    if (ind >= 0) this.splice(ind, 1);
    return this;
  };
}
if (!Array.prototype.removeAt) {
  Array.prototype.removeAt = function (ind) {
    if (ind >= 0) this.splice(ind, 1);
    return this;
  };
}
if (!('find' in Array.prototype)) {
  Array.prototype.find = function (find, that /* opt */) {
    let v;
    for (let i = 0, n = this.length; i < n; i++) if (i in this && find.call(that, v = this[i], i, this)) return v; // eslint-disable-line
    return undefined;
  };
}
if (!Array.prototype.mapMany) {
  Array.prototype.mapMany = function (mapper) {
    return this.reduce((prev, curr) => prev.pushMany(mapper(curr)), []);
  };
}
if (!('pushMany' in Array.prototype)) {
  Array.prototype.pushMany = function (arr) {
    const self = this;
    arr.forEach((f) => { self.push(f); });
    return self;
  };
}
if (!('pushAt' in Array.prototype)) {
  Array.prototype.pushAt = function (ind, obj) {
    const self = this;
    self.splice(ind, 0, obj);
    return self;
  };
}
if (!Array.prototype.first) {
  Array.prototype.first = function (fnc) {
    return fnc ? this.find(fnc) : this[0];
  };
}
if (!Array.prototype.last) {
  Array.prototype.last = function (fnc) { // eslint-disable-line
    if (fnc) {
      for (var i = this.length; i >= 0; i--) {
        if (fnc(this[i])) return this[i];
      }
    } else return this[this.length - 1];
  };
}
if (!('head' in Array.prototype)) {
  Array.prototype.head = function () {
    const self = this;
    return self.filter((f, ind) => ind < self.length - 1);
  };
}
if (!('tail' in Array.prototype)) {
  Array.prototype.tail = function () {
    const self = this;
    return self.filter((f, ind) => ind > 0);
  };
}
if (!('any' in Array.prototype)) {
  Array.prototype.any = function (fnc) {
    if (fnc == null) return this.length > 0; // eslint-disable-line
    for (var i = 0; i < this.length; i++) {
      if (fnc(this[i])) return true;
    }
    return false;
  };
}
if (!('all' in Array.prototype)) {
  Array.prototype.all = function (fnc) {
    const self = this;
    return self.filter(fnc).length === self.length;
  };
}
if (!('take' in Array.prototype)) {
  Array.prototype.take = function (max) {
    const self = this;
    return self.filter((f, ind) => ind < max);
  };
}
if (!('takeFromTo' in Array.prototype)) {
  Array.prototype.takeFromTo = function (from, to) {
    const self = this;
    return self.filter((f, ind) => ind >= from && ind <= to);
  };
}
if (!('takeInGroups' in Array.prototype)) {
  Array.prototype.takeInGroups = function (numOfElInGroup) {
    const self = this;
    return self.filter((f, ind) => ind % numOfElInGroup === 0)
      .map((f, ind) => self.takeFromTo(ind * numOfElInGroup, (ind + 1) * numOfElInGroup - 1));
  };
}
if (!('mapToObject' in Array.prototype)) {
  Array.prototype.mapToObject = function (key, value) {
    if (!isFunction(key)) key = function (f) { return f[key]; };
    if (!isFunction(value)) value = function (f) { return f[value]; };

    const retObj = {};

    this.forEach((f) => {
      retObj[key(f)] = value(f);
    });
    return retObj;
  };
}

if (!Array.prototype.sortBy) {
  Array.prototype.sortBy = function (prop, sortfnc) {
    if (sortfnc == null) sortfnc = function (f, g) { return f > g; }; // eslint-disable-line
    const propfnc = propToFnc(prop);

    const retdata = this.map(f => f);
    for (let i = 0; i < retdata.length - 1; i++) {
      for (let j = i + 1; j < retdata.length; j++) {
        if (sortfnc(propfnc(retdata[i]), propfnc(retdata[j]))) {
          const temp = retdata[i];
          retdata[i] = retdata[j];
          retdata[j] = temp;
        }
      }
    }
    return retdata;
  };
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function (prop) {
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
  Array.prototype.sequentialGroupBy = function (prop) {
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
  Array.prototype.unique = function (propFnc) {
    return this.groupBy(propFnc)
      .filter(f => f != null) // eslint-disable-line
      .map(f => f.items.first());
  };
}

if (!Array.prototype.toggle) {
  Array.prototype.toggle = function (item, add) {
    const hasItem = this.includes(item);
    if (add == null) // eslint-disable-line
      return hasItem ? this.filter(f => f !== item) : [...this, item];
    return !add ? this.filter(f => f !== item) : [...this, item];
  };
}

if (!('deleted' in Array.prototype)) {
  Array.prototype.deleted = function () {
    return this.filter(f => f.deleted);
  };
}

if (!('notDeleted' in Array.prototype)) {
  Array.prototype.notDeleted = function () {
    return this.filter(f => !f.deleted);
  };
}

if (!('sum' in Array.prototype)) {
  Array.prototype.sum = function (prop) {
    const propFnc = propToFnc(prop);
    return this.reduce((acc, f) => acc + propFnc(f), 0);
  };
}

if (!('max' in Array.prototype)) {
  Array.prototype.max = function (prop) {
    const propFnc = propToFnc(prop);
    return this.reduce((acc, f) => Math.max(propFnc(f), acc), propFnc(this[0]));
  };
}

if (!('min' in Array.prototype)) {
  Array.prototype.min = function (prop) {
    const propFnc = propToFnc(prop);
    return this.reduce((acc, f) => Math.min(propFnc(f), acc), propFnc(this[0]));
  };
}

if (!('sortAsc' in Array.prototype)) {
  Array.prototype.sortAsc = function (prop) {
    const propFnc = propToFnc(prop);
    return this.map(propFnc).sort((a, b) => a - b);
  };
}

if (!('sortDesc' in Array.prototype)) {
  Array.prototype.sortDesc = function (prop) {
    const propFnc = propToFnc(prop);
    return this.map(propFnc).sort((a, b) => b - a);
  };
}

var noEnumerableProperties = {};
for (var key in []) { // eslint-disable-line
  if (!enumerableProperties[key]) noEnumerableProperties[key] = { enumerable: false };
}
Object.defineProperties(Array.prototype, noEnumerableProperties);