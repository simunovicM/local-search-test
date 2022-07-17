/* istanbul ignore file */
export const isFunction = (value): boolean => typeof value === 'function';
export const propToFnc: ((prop?: ((item) => any) | string) => ((item, ind?: number) => any)) = (prop?) =>
  isFunction(prop)
    ? (prop as (item) => any)
    : (f) => (prop ? f[prop as string] : f);
export const isNullOrEmpty = (str): boolean => (str == null || !str.toString().trim()); // eslint-disable-line
