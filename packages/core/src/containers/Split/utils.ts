import {range} from '../../utils'
// ([0,1,2,..., k, ..., n], k, p) => [0,1,2,...k,p,...,p]
const sample = <T extends any>(a:T[], k:number, init?:T): T[] => [
    ...a.slice(0, k),
    ...(k-a.length>0? Array(k-a.length).fill(init||a[0]) : [])
]

export function initSplit (o: number[], ...args: number[]): number[]
export function initSplit (o: any=[], l=0, dis=256) {
    if (o.length < 1) return Array(l).fill(l>0?1/l:l)
    return sample(o, l, -1)
        .map((v=0) => 0
            || (v > 0 && (v <= 1 ? v : v/dis))
            || (v < 0 && -1)
            || 0)
        .map((v,_,s) => v>=0? v : 1 - [...s.filter(v=>v>0),0].reduce((a,b)=>a+b)/s.filter(v=>v<0).length)
}
export function moveSplit (
    r: number[], ...args: number[]
): {(i: number): null|{r: number}}

export function moveSplit (r:any=[],k=0, mx=0, s=1, m=0, l=0, dis=256) {
    return (i=0) => [k, k+s].every(e => range(e, -1, l))
        ?  (i===k||i===k+s) && range(r[i]+mx*s*(i===k?1:-1)/dis, m, r[k]+r[k+s]-m)? {r: r[i]+mx*s*(i===k?1:-1)/dis}: null
        :  (i===k||i===k-s) && range(r[i]-mx*s*(i===k?1:-1)/dis, m, r[k]+r[k-s]-m)? {r: r[i]-mx*s*(i===k?1:-1)/dis}: null
}
