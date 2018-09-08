export const isString = value => typeof value === 'string' || value instanceof String;

export const isNumber = value => typeof value === 'number' && isFinite(value);

export const isArray = value => value && typeof value === 'object' && value.constructor === Array;

export const isObject = value => value && typeof value === 'object' && value.constructor === Object;

export const isFunction = value => typeof value === 'function';

export const isNull = value => value === null;

export const isUndefined = value => typeof value === 'undefined';

export const isBoolean = value => typeof value === 'boolean';

export const isError = value => value instanceof Error && typeof value.message !== 'undefined';

export const isDate = value => value instanceof Date;

export const isSymbol = value => typeof value === 'symbol';
