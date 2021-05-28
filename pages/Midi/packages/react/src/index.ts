import React from 'react'
import {useLpad} from './useLpad'
import {useMidi} from './useMidi'
export * from './useLpad'

export * from './useMidi'
export const Lpad = React.forwardRef(_Lpad)
export const Midi = React.forwardRef(_Midi)

function _Lpad (props: any, ref: any) {
    const {as='span', ...other} = props
    return React.createElement(as, {...other, ...useLpad(props, ref), ref})
}


function _Midi (props: any, ref: any) {
    const {as='span', ...other} = props
    return React.createElement(as, {...other, ...useMidi(props), ref})
}
