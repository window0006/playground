export function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && (obj !== null);
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isArray(arr) {
  if (Array.isArray) {
    return Array.isArray(arr);
  }
  return Object.prototype.toString.call(arr) === '[object Array]';
}
