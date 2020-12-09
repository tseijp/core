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
import {useGesture} from 'react-use-gesture'
import {Props} from '../../types'
import {treesPaths} from './paths'

const treesConfig = {restSpeedThreshold: 1,restDisplacementThreshold: 0.01}

export function useTrees (props: Props<{
    open:boolean, visible:boolean, depth:number, springconfig:any,
    hide:boolean, immediate:boolean, topStyle:CSS, type:any, content:any,
}>): any[]

export function useTrees (props: any) {
    const {open=true, visible=true, immediate=true, springconfig} = props
    const [state, set] = useState<{[key:string]:boolean}>({open,visible,immediate})
    const bind = useGesture({
        onClick: () => set&&set((p:any) => ({open:!p.open,immediate:false})),
    })
    const spring = useSpring({
        immediate: state.immediate,
        config: {...config.default, ...(springconfig||treesConfig)},
        from: {height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
        to:   {height: state.open? 'auto' : 0,
              opacity: state.open? 1      : 0,
            transform: state.open? 'translate3d(0px,0,0)': 'translate3d(20px,0,0)'},
    })
    const path = useMemo(() => treesPaths[ props.children
            ? (state.open ? 'Minus' : 'Plus')
            : 'Close'], [props.children, state.open])
    useEffect(() => {
        set(p => visible!==p.visible?{...p, visible}:p)
    }, [visible])

    return [spring, bind, path]
}
