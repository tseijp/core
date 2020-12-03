import React, {FC} from 'react'
import {useControl as use} from 'react-three-gui';
import {Split} from '../../../src'

export const HookSplit:FC = () => {
    const dark     = use('dark'    , {type: 'boolean', value: false})
    const vertical = use('vertical', {type: 'boolean', value: false})
    const size  = use('size'  , {type: 'number' , value: 1, min: 0, max: 2})
    const min   = use('min'   , {type: 'number' , value: 0, min: 0, max: 1})
    const length= use('length', {type: 'number' , value: 3, min: 0, max:10})
    return (
        <div style={{height:"50vh"}}>
            <Split {...{vertical,dark,size,min}}>
            {[...Array(~~length)].map((_, num) =>
                <div key={num} style={{width:"100%",height:"100%",background:`rgba(${[
                    `${num     % 3 * 255 / 3}`,
                    `${(num+1) % 3 * 255 / 3}`,
                    `${(num+2) % 3 * 255 / 3}`
                ].join(`, `)},.1)`}}/>
            )}
            </Split>
        </div>
    )
}
export const codeSplit =
`import {Split} from '@tsei/core'
export const Split = (
        <Target
            dark  = {false}
            size  = {1}
            min   = {0}
            width = {0}
            height= {0}>
            <div style={{width:"100%",height:"100%",background:"rgba(255,0,0,.1)"}}/>
            <div style={{width:"100%",height:"100%",background:"rgba(0,255,0,.1)"}}/>
            <div style={{width:"100%",height:"100%",background:"rgba(0,0,255,.1)"}}/>
        </Target>
)`
