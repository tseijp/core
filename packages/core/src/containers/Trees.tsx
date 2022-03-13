// This is a fork of
//     https://github.com/drcmda/react-animated-tree/blob/master/src/index.js
//     https://github.com/drcmda/react-animated-tree/blob/master/src/icons.js
//     https://codesandbox.io/embed/rrw7mrknyp

import React, {Children, useMemo, useState, useEffect} from 'react'
import styled from 'styled-components'
import {useGesture} from 'react-use-gesture'
import {animated as a, useSpring, config} from 'react-spring'

export const treesPaths = {
    Minus: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 347h-442q-14 0 -25 10.5t-11 25.5v0q0 15 11 25.5t25 10.5h442q14 0 25 -10.5t11 -25.5v0 q0 -15 -11 -25.5t-25 -10.5z",
    Plus: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184 q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z",
}

const treesConfig = {restSpeedThreshold: 1,restDisplacementThreshold: 0.01}

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
    const path = useMemo(() => props.children && treesPaths[(
        state.open ? 'Minus' : 'Plus'
    )], [props.children, state.open])
    useEffect(() => {
        set(p => visible!==p.visible?{...p, visible}:p)
    }, [visible])

    return [spring, bind, path]
}

const TreesTop = styled<any>(a.div)`
    padding: 4px 0px 0px 0px;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-left: ${props => `1px dashed #${props.dark?818181:212121}`};
    padding: ${props => `4px 0px 0px ${props.size*25}px`};
`
const TreesMain = styled<any>(a.div)`
    font-size: ${props => props.size*50}px;
    will-change: transform, opacity, height;
    margin-left: 6;
`
const TreesType = styled<any>(a.span)`
    font-size: 0.6em;
    font-family: monospace;
    text-transform: uppercase;
    white-space: nowrap;
    vertical-align: middle;
    margin-right: ${props => props.type? 10:0};
    color: ${props => props.color};
`
const TreesCont = styled<any>(a.div)`
    display: inline-block;
    vertical-align: middle;
    font-size: ${props => props.size*50}px;
    color: ${props => props.color};
`
const TreesIcon = styled.svg<any>`
    width: 1em;
    height: 1em;
    cursor: pointer;
    margin-right: 10;
    vertical-align: middle;
    font-size: ${props => props.size*50}px;
    color: ${props => props.color}
`
export function Trees (props: any) {
    const { content, type, depth=0, root=1, size=1.5,
            dark=false, style={}, viewBox="64 -65 897 897"} = props
    const [spring, bind, path] = useTrees(props)
    const color = useMemo(() => dark? "#818181": "#212121", [dark])
    const main  = useMemo(() => Children.map(props.children, child => {
        const grand = Children.toArray((child as any)?.props?.children) || []
        return props.children &&
            <Trees {...{...props,
                depth:depth+1, topStyle:{},
                open: depth<root, children: grand.length>1 ? grand.slice(1) : null,
                immediate: false, content : grand.length>1 ? grand[0] : child,}}/>
    }), [props, depth, root])

    return (
        <TreesTop {...{style, size}}>
            {path && !content ? null :
            <TreesIcon {...{color, size, viewBox}} {...bind()}>
                <g><path d={path}/></g>
            </TreesIcon>}
            <TreesType {...{color, type}}>{type}</TreesType>
            <TreesCont {...{color, size}}>{content}</TreesCont>
            <TreesMain {...{depth, size}} style={spring}>{main}</TreesMain>
        </TreesTop>
    )
}
