import React, {CSSProperties as CSS, FC, Children} from 'react'
import {Props} from '../types'
const styles:CSS[] = [
   {position:"absolute",left:0,bottom:0,background:"#212121",minWidth:"100%",height:"auto",},
   {position:"relative",textAlign:"center"},
]
export type Foot = FC<Props>
export const Foot:Foot = ({
    children, size=1, style={}, ...props
}) => {
    return (
        <div {...props} style={{...styles[0], ...style,
            borderRadius:`${size*25}px ${size*25}px 0px 0px`,
            padding     :`0px ${size*50}px ${size*25}px ${size*50}px`}}>
            {Children.map(children, child =>
                <div style={{...styles[1],fontSize:size*50}}>{child}</div>
            )}
        </div>
    )
}
