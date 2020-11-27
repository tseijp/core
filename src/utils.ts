// ************************* 👌 FOR Components 👌 ************************* //

export const topUp = (text=""):string => ""+text.charAt(0).toUpperCase()+""+text.slice(1).toLowerCase()
export const clamp = (x:number, min=0, max=1) :number  => (x<min)?min:(x>max)?max:x
export const range = (x:number, min=0, max=1) :boolean => min < x && x < max
export const swap  = (arr:number[],ind:number,row:number) => {
    const ret = [...arr.slice(0, ind), ...arr.slice(ind+1, arr.length)]
    return [...ret.slice(0, row), ...arr.slice(ind, ind+1), ...ret.slice(row)]
}
export const sign =(num=0):number=> 0
    ||  (num < 0 &&-1)
    ||  (num > 0 && 1)
    ||  (num===0 && 0)
    ||  0
export const samp = <T extends any>(a:T[], l:number, d?:T):T[] => [
    ...a.slice(0,l),
    ...(l-a.length>0? Array(l-a.length).fill(d||a[0]) : [])
]
export const getWRate = (o=[] as number[],l=0,w=0,width=window.innerWidth) =>
    o instanceof Array && o.length > 0
        ? samp(o, l, -1)
            .map((v=0) => 0
                || (w > 0 && (w <= 1 ? w : w/width))
                || (v > 0 && (v <= 1 ? v : v/width))
                || (v < 0 && -1)
                || 0)
            .map((v,_,s) => v>=0? v : 1 - [...s.filter(v=>v>0),0].reduce((a,b)=>a+b)/s.filter(v=>v<0).length)
        : Array(l).fill(l>0?1/l:l)
// ************************* 🍭 helpers 🍭 ************************* //
// * This function is fork of react-spring
// * Code : https://github.com/pmndrs/react-spring/blob/master/src/shared/helpers.ts
// ************************* *************** ************************* //
export const is = {
    arr: Array.isArray,
    obj: (a: unknown): a is object    => Object.prototype.toString.call(a) === '[object Object]',
    fun: (a: unknown): a is Function  => typeof a === 'function',
    str: (a: unknown): a is string    => typeof a === 'string',
    num: (a: unknown): a is number    => typeof a === 'number',
    und: (a: unknown): a is undefined => a === void 0,
    nul: (a: unknown): a is null      => a === null,
    set: (a: unknown): a is Set<any>  => a instanceof Set,
    map: (a: unknown): a is Map<any, any> => a instanceof Map,
    equ(a: any, b: any) {
    if (typeof a !== typeof b) return false
        if (is.str(a) || is.num(a)) return a === b
        if (is.obj(a) &&
            is.obj(b) &&
            Object.keys(a).length + Object.keys(b).length === 0)
            return true
        let i
        for (i in a) if (!(i in b))     return false
        for (i in b) if (a[i] !== b[i]) return false
        return is.und(i) ? a === b : true
    },
}

export function merge(target: any, lowercase: boolean = true) {
  return (object: object) =>
    (is.arr(object) ? object : Object.keys(object)).reduce(
        (acc: any, element) => {
            const key = lowercase
              ? element[0].toLowerCase() + element.substring(1)
              : element
            acc[key] = target(key)
            return acc
        },
        target
    )
}
