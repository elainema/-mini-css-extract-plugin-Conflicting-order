export default class CommonUtil{
  constructor() {
  }
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    return map[toString.call(obj)]
  }

  static deepCopy(data) {
    const t = this.typeOf(data)
    let o

    if (t === 'array') {
      o = []
    } else if (t === 'object') {
      o = {}
    } else {
      return data
    }

    if (t === 'array') {
      for (let i = 0; i < data.length; i++) {
        o.push(this.deepCopy(data[i]))
      }
    } else if (t === 'object') {
      for (let i in data) {
        o[i] = this.deepCopy(data[i])
      }
    }
    return o
  }
}
