function is (a: any, b?: any, ...other: any): boolean {
    if (other.length > 0) return is(a, b) && is(b, ...other)
    if (typeof a !== typeof b) return false
    if (is.str(a) || is.num(a)) return a === b
    if (is.obj(a) && is.obj(b) && is.len(0, a) && is.len(0, b)) return true
    for (let i in a) if (!(i in b)) return false
    for (let i in b) if (a[i] !== b[i]) return false
    return true
}

is.arr = Array.isArray
is.fls = (a: unknown): a is false => is.und(a) || is.nul(a) || a === false || a === ''
is.nul = (a: unknown): a is null => a === null
is.und = (a: unknown): a is undefined => a === void 0
is.num = (a: unknown): a is number => typeof a === 'number'
is.str = (a: unknown): a is string => typeof a === 'string'
is.fun = (a: unknown): a is Function => typeof a === 'function'
is.obj = (a: unknown): a is object => Object.prototype.toString.call(a) === '[object Object]'
is.url = (a: unknown): a is URL => a instanceof URL
is.set = (a: unknown): a is Set<any> => a instanceof Set
is.map = (a: unknown): a is Map<any, any> => a instanceof Map
is.big = (a: unknown): a is string => is.str(a) && a === a.toUpperCase()
is.len = (l: number, a: any): a is object => a && (is.arr(a)? a: Object.keys(a)).length === l

export  { is }
