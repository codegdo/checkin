export const clone = (target: any): any => {
  if (Object.prototype.toString.call(target) === '[object Array]') {
    const a = [];

    for (let i = 0; i < target.length; i++) {
      a[i] = clone(target[i]);
    }

    return a;
  } else if (typeof target === 'object') {
    const o: any = {}

    for (const prop in target) {
      if (target.hasOwnProperty(prop)) {
        o[prop] = clone(o[prop])
      }
    }

    return o;
  } else {
    return target;
  }
}