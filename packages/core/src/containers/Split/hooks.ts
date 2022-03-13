import {CSSProperties as CSS,useEffect,useCallback,useMemo,useRef} from 'react'
import {useSprings} from 'react-spring'
import {useGesture} from 'react-use-gesture'
import {SplitProps} from './types'
import {initSplit, moveSplit} from './utils'

export function useSplit (props: Partial<SplitProps>): [
    (i: number) => CSS,
    (i: number) => any,
]

export function useSplit ({
    children=null, style={},
    min=0, width=window.innerWidth, height=window.innerHeight,
    order=[], vertical=false,
}: any) {
    const len  = useMemo<number>(() => children?.length||0, [children])
    const dis  = useMemo<number>(() => vertical? height: width, [vertical, height, width])
    const sRef = useRef<number>(0)
    const rRef = useRef<number[]>(initSplit(order, len, dis))
    const [s,_]= useSprings(len, i=>({r: rRef.current[i]}))
    const bind = useGesture({
        onDrag: ({first, last, args:[key], movement, direction}) => {
            const [m, d] = [movement, direction].map(xy => xy[vertical?1:0])
            if (sRef.current===0||first)
                sRef.current = sign(d);
            if (sign(d)===sRef.current)
                _( moveSplit(rRef.current, key, m, sign(d), min, len, dis) )
            if (last)
                rRef.current = s.map((s:any) => s.r.animation.to || 0)
        }
    })

    // *************** RENDER *************** //
    const styles = useCallback((i=0) => ({
        ...style, ...(vertical
            ? {width : "100%", height: s[i]?.r?.to((v=0) => `${100*v}%`)}
            : {height: "100%", width : s[i]?.r?.to((v=0) => `${100*v}%`)}),
        verticalAlign: "top",
        display:`${vertical?"":"inline-"}block`,
    } as CSS), [vertical, s, style])

    useEffect(() => {
        rRef.current = initSplit(order,len,dis)
        _(i => ({r: rRef.current[i]}))
    }, [order, len, dis, _])

    return [styles, bind]
}

function sign(num=0):number {
    return (num < 0 &&-1)
        || (num > 0 && 1)
        || (num===0 && 0)
        || 0
}
