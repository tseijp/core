import React, {Children, CSSProperties as CSS, useCallback, useMemo, useState, useRef} from 'react'
import {useSprings, animated} from 'react-spring'
const styles:{[key:string]:CSS} = {
    pill: {position:"absolute",padding:"0px",zIndex:1,transform:`translate(-50%,-50%)`,}
}

export function Pills (props: Partial<{
    position: {x:number, y:number, r:number},
    depth:number,
    rate:number,
    size:number,
    isOpen:boolean
}>): null | JSX.Element

export function Pills (props: any) {
    const {
        position={x:0,y:0,r:Math.PI/4}, depth=0, rate=1.414,
        size=1, isOpen=true, ...other
    } = props
    const length = useMemo(() => (other?.children as any)?.length||1, [other])
    const childPos = useRef( Array(length).fill(position) )
    const fn = useCallback(() => (i=0) => {
        const r = position.r/2 + (Math.PI/2) * ((length-i-1)*10+1)/((length-1)*10+2)-Math.PI/8
        const x = isOpen ?  50*rate*size*Math.cos(r) : 0
        const y = isOpen ? -50*rate*size*Math.sin(r) : 0
        childPos.current[i] = {x,y:-y,r}
        return {x, y, scale:isOpen?1:0 }
    }, [isOpen, length, position.r, rate, size])
    const [springs, set] = useSprings( length, fn() )
    const [childHub, setChildHub] = useState( Array(length).fill(false) )
    const setHub = useCallback((e, key)=>{
        setChildHub(p => Object.assign([], p, {[key]:!p[key]}))
        e.stopPropagation()
    },[])
    const children = useMemo(() => Children.map( other.children, (child,key) => {
        set(fn())
        return child && (child as any)?.other?.children
          ? React.cloneElement(child as any, {children:
                <Pills {...{key, isOpen:isOpen&&childHub[key],
                    depth:depth+1, position:childPos.current[key],
                    rate:rate*(1+(depth+1)*0.2),
                    fontSize:50*size/(1+(depth+1)*0.2),
                    ...((child as any).other||{})}}/>
            })
          : child
    }), [childHub, depth, fn, isOpen, other.children, rate, set, size])
    return (
        <div style={{position:"fixed",left:position.x,bottom:position.y}}>
            {springs.map((spring, key) =>
                <animated.div key={`${depth}-${key}`} style={{...spring, ...styles.pill} as any}
                    onClick={e=>setHub(e, key)}>
                    {(children as any)[key]}
                </animated.div>
            )}
        </div>
    )
}
