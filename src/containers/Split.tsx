import React, {CSSProperties as CSS,FC,Children,useMemo,useEffect,useRef} from 'react'
import {useSpring, useSprings, animated as a} from 'react-spring'
import {useGesture} from 'react-use-gesture'
import {Props} from '../types'
import {clamp,range,sign,getWRate,} from '../utils'

const styles:{[key:string]:CSS} = {
    cont: {position:"relative",overflow:"visible",width:"100%",whiteSpace:"nowrap",},
    item: {position:"relative",overflow:"visible",height:"100%",display:"inline-block",verticalAlign:"top"},
}
export type Split = FC<Props<{
    order :number[]|[], styleItem:CSS,
    width :number, height:number, min:number
}>>
export const Split:Split = ({
    order=[], width=0, height=0, min=0,
    dark=false,size=1, style={}, styleItem={}, ...props
}) => {
    const sRef = useRef<number>(0)
    const lRef = useRef<number>((props as any)?.children?.length||1)
    const hRef = useRef<number>(height||1)
    const wRef = useRef<number[]>(getWRate(order, lRef.current, width,))
    const [spring,  setH] = useSpring(() => ({h:hRef.current}))
    const [springs, setW] = useSprings(wRef.current.length, i=>({w:wRef.current[i],z:0}))
    const move = (mx=0, k=0, s=1, m=0, w=wRef.current, W=window.innerWidth) => (i=0) =>
        [k,k+s].every(e => range(e, -1, lRef.current))
        ? (i===k||i===k+s) && range(w[i]+mx*s*(i===k?1:-1)/W, m, w[k]+w[k+s]-m)? {w:w[i]+mx*s*(i===k?1:-1)/W}:null
        : (i===k||i===k-s) && range(w[i]-mx*s*(i===k?1:-1)/W, m, w[k]+w[k-s]-m)? {w:w[i]-mx*s*(i===k?1:-1)/W}:null
    const bind = useGesture({
        onDrag:({first, last, args:[key], movement:[mx,my], direction:[dir]}) => {
            if (sRef.current===0||first) sRef.current = sign(dir);
            sign(dir) && sign(dir)===sRef.current &&
            setW(move(mx,key,sign(dir),min))
            setH({h:clamp(hRef.current+my/window.innerHeight, min, 1)})
            if (!last) return
            wRef.current = springs.map((s:any) => s.w.animation.to || 0)
            hRef.current = spring.h.animation.to as number || 0
        }
    })//, {drag:{lockDirection: true}}) //error if here
    const children = useMemo(() => Children.map(props.children, c=>c), [props.children])
    useEffect(() => {
        const len = (props as any)?.children?.length||0
        if (len===lRef.current) return
        lRef.current = len
        wRef.current = [...wRef.current.map(v=>v-1/len/wRef.current.length), 1/len]
        setW((i) => ({w:wRef.current[i]}))
    },  [props, setW])
    useEffect(() => {
        wRef.current = getWRate(order,lRef.current,width)
        setW(i=>({w:wRef.current[i]}))
    }, [width, setW, order])
    useEffect(() => {
        hRef.current = height||1
        setH({h:hRef.current})
    }, [height, setH])
    return (
        <a.div style={{...styles.cont, height:spring.h.interpolate(v=>`${v*100}%`),
                       ...style}} {...props}>
            {springs.map(({w},key) =>
                <a.div {...bind(key)} {...{key}} style={{
                        ...styles.item, ...styleItem,
                        width:w.interpolate(v => `${100*v}%`),
                        //zIndex:z.interpolate(v => ~~(v*10))
                    }}>
                    {(children as any)[key]}
                </a.div>
            )}
        </a.div>
    )
}
