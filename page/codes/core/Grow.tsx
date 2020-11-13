import React, {
    FC, //CSSProperties as CSS, Children,
    //useMemo, useCallback, useState, useEffect, useRef
} from 'react'
import {useControl} from 'react-three-gui';
import {Grow} from '../../../src'
export const HookGrow:FC = () => {
    const dark  = useControl('dark' , {type: 'boolean', value: false})
    const size  = useControl('size' , {type: 'number' , value: 1, min: 0, max: 2})
    return (
        <Grow {...{dark, size}}/>
    )
}
export const codeGrow =
`import {Grow} from '@tsei/core'
const App =  => (
    <Grow
        dark={true}
        size={1}/>
)`
