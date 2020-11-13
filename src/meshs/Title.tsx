//import * as THREE from 'three'
import React, {FC} from 'react'
import {Text} from "drei";
// import { EffectComposer, Bloom } from "react-postprocessing";
import { useReflow} from "react-three-flex";
import {Props} from '../types'

export type Title = FC<Props<{
    anchorX:number|undefined|"center"|"left"|"right",
    anchorY:number|undefined|"top"|"top-baseline"|"middle"|"bottom-baseline"|"bottom",
    textAlign:undefined|"center"|"left"|"right"|"justify",
    href:string
}>>
export const Title:Title = ({
    anchorX="center", anchorY="middle", textAlign="center", href="",
    dark=false, size=1, space=0, maxWidth=-1, children, ...props
}) => {
    const reflow = useReflow()
    const color = props.color || dark? "#fff": "#000"
    const onClick = href? null: () => window.open(href)
    return (
        <Text {...props as any} {...{color, anchorX, anchorY, textAlign, maxWidth, onClick}}
            onSync={reflow} letterSpacing={space} fontSize={size/2} lineHeight={size/2}>
            {typeof children==="string"? children: (children as any)?.props?.children||''}
            <meshStandardMaterial />
        </Text>
    )
}
