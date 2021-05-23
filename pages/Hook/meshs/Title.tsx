//import * as THREE from 'three'
import React from 'react'
import {Text} from "@react-three/drei";
import {useReflow} from "react-three-flex";
// import { EffectComposer, Bloom } from "react-postprocessing";
import {Props} from '../../src'

export function Title (props: Props<{
    anchorX: number|undefined|"center"|"left"|"right",
    anchorY: number|undefined|"top"|"top-baseline"|"middle"|"bottom-baseline"|"bottom",
    textAlign: undefined|"center"|"left"|"right"|"justify",
    href: string,
    children: JSX.Element|string,
}>): JSX.Element

export function Title ({
    anchorX="center", anchorY="middle", textAlign="center", href="",
    dark=false, size=1, space=0, maxWidth=-1, children, ...props
}: any) {
    const color = props.color || dark? "#fff": "#000"
    const reflow = useReflow()
    const onClick = href? undefined: () => window.open(href)
    return (
        <Text
            onSync={reflow}
            fontSize={size/2}
            lineHeight={size/2}
            letterSpacing={space}
            {...props as any}
            {...{color, anchorX, anchorY, textAlign, maxWidth, onClick}}>
            {typeof children==="string"? children: (children as any)?.props?.children||''}
            <meshStandardMaterial />
        </Text>
    )
}
