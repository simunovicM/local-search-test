import { Buffer } from 'buffer';
import Vue from 'vue';

/* istanbul ignore file */
export const isFunction = value => typeof value === 'function';
export const isObject = value => value !== null && typeof value === 'object';
export const isString = value => typeof value === 'string' || value instanceof String;

export const propToBool = prop => prop === '' || prop;
export const propToFnc = prop => (isFunction(prop) ? prop : (f => (prop ? f[prop] : f)));

export const isBetween = (val, from, to) => val >= from && val <= to;

export const errorDebug = (error) => {
  if (error !== false && error.toString() !== 'Cancel') {
    if (process.env.NODE_ENV === 'development')
      console.trace(error); // eslint-disable-line
    var errorData = (error.response || {}).data;
    Vue.notify({ type: 'error', text: errorData.message });
  }
};

export const Debouncer = function (milliseconds) {
  var finishFnc = null;
  var fncs = [];
  let date = null;
  const startCountdown = function () {
    date = new Date(Date.now() + milliseconds);
    var rec = function () {
      if (date != null) { // eslint-disable-line
        if (date < new Date()) {
          date = null;
          fncs.forEach((fnc) => { fnc(); });
          fncs = [];
          if (finishFnc) {
            finishFnc();
            finishFnc = null;
          }
        } else {
          setTimeout(rec, 0);
        }
      }
    };
    rec();
  };
  this.clear = () => {
    date = null;
    fncs = [];
    return this;
  };
  this.push = (fnc) => {
    fncs.push(fnc);
    startCountdown();
    return this;
  };
  this.onFinishFnc = (fnc) => {
    finishFnc = fnc;
    return this;
  };
  this.hasOnFinishFnc = () => finishFnc != null; // eslint-disable-line
  this.isProcessing = () => fncs.length > 0;
  this.pause = () => date = new Date(Date.now() + 100000000000);
  this.setTimer = newMiliseconds => milliseconds = newMiliseconds;

  this.resetTimer = startCountdown;
};

export const createFormData = (obj) => {
  const fd = new FormData();
  Object.keys(obj)
    .forEach(key => fd.append(key, obj[key]));
  return fd;
};

export const hashCode = (obj) => {
  const str = JSON.stringify(obj);
  let hash = 0;
  if (!str.length) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
};

export const toKeyValue = obj => Object.keys(obj)
  .reduce((acc, key) => {
    acc.push({ key, value: obj[key] });
    return acc;
  }, []);

export const getAllParentNodes = el => el.parentNode ? [el.parentNode, ...getAllParentNodes(el.parentNode)] : [];
export const getAllChildrens = function getAllChildrens(element) {
  var arr = Array.from(element.children);
  return arr.mapMany(f => [f].pushMany(getAllChildrens(f)));
};
export const getAllChildNodes = function getAllChildNodes(element) {
  var arr = Array.from(element.childNodes);
  return arr.mapMany(f => [f].pushMany(getAllChildNodes(f)));
};

export const getObjectFromProps = (obj, properties) => properties.reduce((acc, key) => { acc[key] = obj[key]; return acc; }, {});

export const randomString = format => format.replace(/[Xx]/g, c => {
  var num = Math.floor(Math.random() * 26 + 65);
  var char = String.fromCharCode(num);
  return c === 'X' ? char : char.toLowerCase();
});

export const truncateString = (str, num) => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return `${str.slice(0, num)}...`;
};

export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const isNullOrEmpty = function (str) {
  return (str == null || !str.toString().trim()); // eslint-disable-line
};

const btoa = str => new Buffer.from(str, 'binary').toString('base64');
export const objectToHash = obj => btoa(JSON.stringify(obj));

const atob = str => Buffer.from(str, 'base64').toString('binary');
export const hashToObject = hash => JSON.parse(atob(hash.substring(1)));

export const round = (val, dec) => Math.round(val * Math.pow(10, dec || 0)) / Math.pow(10, dec || 0);