// This is a fork of
//     https://github.com/drcmda/react-animated-tree/blob/master/src/index.js
//     https://github.com/drcmda/react-animated-tree/blob/master/src/icons.js
// demo: https://codesandbox.io/embed/rrw7mrknyp
//     @content, Name of the node (string or React-component)
//     @type   , optional description, good for displaying icons, too (string or React-component)
//     @open   , optional: default open state
//     @hide, optional: when set true displays an eye icon
//     @visible, optional: default visible state
//     @onClick, optional: click events on the eye
//     @springconfig, optional: react-spring animation config
import {CSSProperties as CSS, useMemo, useState, useEffect} from 'react'
import {useSpring, config} from 'react-spring'
import {Props} from '../../types'
import {treesStyles, treesConfig} from './utils'

export function useTrees (props: Props<{
    open:boolean, visible:boolean, depth:number, springconfig:any,
    hide:boolean, immediate:boolean, topStyle:CSS, type:any, content:any,
}>): any

export function useTrees (props: any) {
    const {open=true, visible=true, immediate=true, springconfig} = props
    const [state, set] = useState<{[key:string]:boolean}>({open,visible,immediate})
    const spring = useSpring({
        immediate: state.immediate,
        config: {...config.default, ...(springconfig||treesConfig)},
        from: {height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
        to:   {height: state.open? 'auto' : 0,
              opacity: state.open? 1      : 0,
            transform: state.open? 'translate3d(0px,0,0)': 'translate3d(20px,0,0)'},
    })
    const icon = useMemo(() => props.children
        ? (state.open ? 'Minus' : 'Plus')
        : 'Close', [props.children, state.open])

    useEffect(() => {
        set(p => visible!==p.visible?{...p, visible}:p)
    }, [visible])

    const {dark=false, size=1, depth=0, style={}, topStyle={}} = props
    const [top, child] = useMemo(() => [
       {fontSize:size*50, ...treesStyles.tree, ...style, ...topStyle},
       {...(depth > 0? {borderLeft:`1px dashed #${dark?818181:212121}`}:{}),
        ...treesStyles.top, padding:`4px 0px 0px ${size*25}px`,
        ...spring}] as any[],  [size, style, topStyle, dark, depth, spring])

    return [{topStyle:top, childStyle: child, icon}, set]
}
