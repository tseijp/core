import React, {CSSProperties as CSS, FC, useMemo} from 'react'
import {Props} from '../types'

export type Head = FC<Props>
export const Head:Head = ({
    children, color="", dark=false,size=1, style={}, ...props
}) => {
    style = useMemo<CSS>(()=>({
        fontSize:size*50,
        color:color||dark?"#818181":"#000",
        width:`max(70vw, 100vw - ${size*200}px)`,
        height:"auto",
        margin:"auto",
        ...style
    }), [color,dark,size,style])
    return <div {...{children,style,...props}}/>
}
