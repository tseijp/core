import React, {
    FC, CSSProperties as CSS, //Children,
    //useMemo, useCallback, useState, useEffect, useRef
} from 'react'
import {useControl as use} from 'react-three-gui';
import {Card} from '../../../src'
const style:CSS = {textAlign:"center", verticalAlign:"middle", padding:"auto auto", fontSize:100}
const colors = ["black","white",]
export const HookCard:FC = () => {
    const dark  = use('dark' , {type: 'boolean', value: true})
    const size  = use('size' , {type: 'number' , value: 1, min: 0, max: 2})
    const space = use('space', {type: 'number' , value: 0, min: 0, max: 500})
    const rate  = use('rate' , {type: 'number' , value: 1, min:-5, max: 5})
    const min   = use('min'  , {type: 'number' , value: 0, min: 0, max: 500})
    const max   = use('max'  , {type: 'number' , value: 0, min: 0, max: 500})
    const color    = use('color'   , {type: 'select' , value: colors[0], items: colors})
    const children = use('children', {type: 'select' , value: colors[0], items: colors})
    return (
        <Card {...{dark,size,space,rate,min,max,children}}
            style={{...style,color,margin:`${size*100}px auto ${size*100}px auto`}}/>
    )
}
export const codeCard =
`import {Card} from '@tsei/core'
const App =  => (
    <Card
        dark={false}
        size={1}
        min ={0}
        max ={0}
        color=""/>
)`
