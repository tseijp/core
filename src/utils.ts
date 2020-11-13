import {Page, PageConfig, URL as U, UserConfig} from './types'
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

// ************************* 👌 use-page 👌 ************************* //
export const equalPathname = (...urls:(U|string|undefined|null|false)[]) =>
    urls.map(u => typeof u==="string"? new URL(u) : u)
        .map(u => u && joinURL(u.pathname, "/"))
        .every((u, _, self) => u===self[0])

export const pageConfig:PageConfig = {
    onChange:null,
}
export const defaultPage = {
    id      :window.location.pathname.split('/').filter(v=>v).find((_,i)=>i===1)||"",
    isHome  :window.location.pathname.split('/').filter(v=>v).length > 1,
    isLocal :window.location.hostname==="localhost",
    protocol:window.location.protocol ||"",
    hostname:window.location.hostname ||"",
    portname:window.location.port     ||"",
    pathname:window.location.pathname ||"",
    search  :window.location.search   ||"",
    hash    :window.location.hash     ||"",
    language:window.navigator.language||"ja",
    urls    :[new URL(window.location.href)],
}
export const joinPage = <T={}>(page:Page<T>):string|string[] => {
    const {protocol,hostname,portname,pathname="",search="",hash=""} = page;
    const arr  =[protocol,hostname,portname,pathname,search,hash]
    const getp =(port:any)=>port?`:${port}`:""
    const geti =(i=0,n:any)=>n instanceof Array?(i<n.length?n[i]:n[n.length-1]):n
    if (arr.every(v=>typeof v==="string"))
        return joinURL(`${protocol}//${hostname}${getp(portname)}/`,pathname as any, search as any)
    const maxLength = arr.map(v=>v instanceof Array?v.length:1).reduce((a,b)=>a>b?a:b)
    return [...Array(maxLength)].map((_,i) =>
        joinURL( `${geti(i,protocol)}//${geti(i,hostname)
            }${getp(geti(i,portname))}/`,geti(i,pathname),geti(i,search) )
    ) as string[]
}
export const normPage = <T extends {}={}>(page:Page<T>) => {
    const state = {...page} as any//Page<T>
    Object.entries(state).sort(([_,val]) => typeof val==="function"?1:-1)
    .forEach(([key,val]:any) => (state[key]=typeof val==="function"?val(state):val))
    const urls = joinPage<T>(state as Page<T>)
    return {...state, urls:urls instanceof Array
      ? urls.map((u:any) => typeof u==="string" ? new URL(u) : u) as U[]
      : [typeof urls==="string" ? new URL(urls) : urls] as U[] } as Page<T>
}

// ************************* 🙍‍♂️ For useUser 🙍 ************************* //
export const defaultUserConfig:UserConfig = {
    keys:['username','authtoken'],
    user:null,
    onSign:null,
    onSignin:null,
    onSignout:null
}
// ************************* 🍡 join-url 🍡 ************************* //
// * This function is fork of join-url/urljoin
// * Code : https://github.com/jfromaniello/url-join/blob/master/lib/url-join.js
// ************************* *************** ************************* //
export function joinURL (...strArray:(string|number)[]) : string {
    var resultArray = [];
    if (strArray.length === 0) return ''
    if (typeof strArray[0] !== 'string') throw new TypeError('Url must be string.');
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1)
        strArray[0] = strArray.shift() + strArray[0];
    if (strArray[0].match(/^file:\/\/\//))
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    else
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    strArray = strArray.filter(str=>str!=="")
    for (var i = 0; i < strArray.length; i++) {
        let str = strArray[i];
        if (typeof str === 'number') str = String(str)
        if (typeof str !== 'string') throw new TypeError(`${str} must be a string. Received ${typeof str}`);
        if (str === '') continue;
        if (i > 0) str = str.replace(/^[\/]+/, '');                   //eslint-disable-line
        if (i < strArray.length - 1) str = str.replace(/[\/]+$/, ''); //eslint-disable-line
        else str = str.replace(/[\/]+$/, '/');                        //eslint-disable-line
        resultArray.push(str);
    }
    let str = (resultArray as string[]).join('/');
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');
    let parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');
    return str;
}
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
