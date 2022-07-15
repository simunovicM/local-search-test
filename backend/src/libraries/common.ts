/* istanbul ignore file */
export const isFunction = value => typeof value === 'function';
export const propToFnc: Function = (prop?: Function | string) => (isFunction(prop) ? prop : (f => (prop ? f[prop as string] : f)));
export const isNullOrEmpty = str => (str == null || !str.toString().trim()); // eslint-disable-line
