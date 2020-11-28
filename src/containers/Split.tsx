import React, {CSSProperties as CSS,FC,Children,useMemo,useEffect,useRef} from 'react'
import {useSprings, animated as a} from 'react-spring'
import {useGesture} from 'react-use-gesture'
import {Props} from '../types'
import {range,sign,getWRate,} from '../utils'

const styles:{[key:string]:CSS} = {
    cont: {position:"relative",overflow:"visible",width:"100%",whiteSpace:"nowrap",height:"100%"},
    item: {position:"relative",overflow:"visible",height:"100%",display:"inline-block",verticalAlign:"top"},
}
export type Split = FC<Props<{
    order :number[]|[], styleItem:CSS,
    width :number, height:number, min:number
}>>
export const Split:Split = ({
    order=[], width=0, height=0, min=0, //children,
    dark=false,size=1, style={}, styleItem={}, ...props
}) => {
    //if (!(children instanceof Array)) children = Children.map(props.children, c=>c)
    // REF
    const sRef = useRef<number>(0)
    const lRef = useRef<number>((props as any)?.children?.length||1)
    const wRef = useRef<number[]>(getWRate(order, lRef.current, width))
    const [s, set] = useSprings(wRef.current.length, i=>({w:wRef.current[i],z:0}))
    const bind = useGesture({
        onDrag:({first, last, args:[key], movement:[mx], direction:[dir]}) => {
            if (sRef.current===0||first) sRef.current = sign(dir);
            sign(dir)===sRef.current &&  set(move(key,mx,sign(dir),min,wRef,lRef))
            if (!last) return
            wRef.current = s.map((s:any) => s.w.animation.to || 0)
        }
    })
    const children = useMemo(() => Children.map(props.children, c=>c), [props.children])
    useEffect(() => {
        const len = (props as any)?.children?.length||0
        if (len===lRef.current) return
        lRef.current = len
        wRef.current = [...wRef.current.map(v=>v-1/len/wRef.current.length), 1/len]
        set((i) => ({w:wRef.current[i]}))
    },  [props, set])
    useEffect(() => {
        wRef.current = getWRate(order,lRef.current,width)
        set(i=>({w:wRef.current[i]}))
    }, [width, set, order])
    return (
        <a.div style={{...styles.cont, ...style} as any} {...props}>
            {s.map(({w},key) =>
                <a.div {...bind(key)} {...{key}} style={{
                        ...styles.item, ...styleItem,
                        width:w.interpolate(v => `${100*v}%`),
                        //zIndex:z.interpolate(v => ~~(v*10))
                    } as any}>
                    {(children as any)[key]}
                </a.div>
            )}
        </a.div>
    )
}
function move (
    k=0, mx=0, s=1, m=0,
    {current:w=[] as number[]},
    {current:l=0},
    W=window.innerWidth
) {
    return (i=0) =>
        [k,k+s].every(e => range(e, -1, l))
        ? (i===k||i===k+s) && range(w[i]+mx*s*(i===k?1:-1)/W, m, w[k]+w[k+s]-m)? {w:w[i]+mx*s*(i===k?1:-1)/W}: null
        : (i===k||i===k-s) && range(w[i]-mx*s*(i===k?1:-1)/W, m, w[k]+w[k-s]-m)? {w:w[i]-mx*s*(i===k?1:-1)/W}: null
}
