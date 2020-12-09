import React, {CSSProperties as CSS, FC,useEffect, useMemo, useRef} from 'react'
import {Props} from '../types'
import {useView} from 'use-grid'
export type Grow = FC<Props>
export const Grow: Grow = ({
    onView=null, role="status",
    size=1, className="spinner-grow", ...props
}) => {
    const fn = useRef()
    const ref = useRef(null)
    useEffect(()=>{fn.current = onView}, [onView])
    useView(ref, (e:any) => 1
        && e.isIntersecting
        && typeof fn.current==="function"
        && (fn.current as any)())
    const style = useMemo<CSS>(()=>({
        position:"relative",display:"grid",margin:`${size*50}px auto 0 auto`,
        width:size*250,height:size*250,...(props.style||{})
    }), [size, props.style])
    return <div  {...props} {...{ref,role,className,style}} />
}
