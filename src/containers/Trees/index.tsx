import React, {Children, useMemo} from 'react'
import {useTrees} from './hooks'
import {animated as a} from 'react-spring'
import styled from 'styled-components'
// import {Props} from '../../types'

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
    will-Cchange: transform, opacity, height;
    margin-left: 6;
`
const TreesType = styled<any>(a.span)`
    font-size: 0.6em;
    font-family: monospace;
    text-transform: uppercase;
    white-space: nowrap;
    vertical-align: middle;
    marginRight: ${props => props.type? 10:0};
    color: ${props => props.color};
`
const TreesCont = styled<any>(a.div)`
    display: inline-block;
    verticalAlign: middle;
    font-size: ${props => props.size*50}px;
    color: ${props => props.color};
`
const TreesIcon = styled.svg<any>`
    width: 1em;
    height: 1em;
    cursor: pointer;
    margin-right: 10;
    verticalAlign: middle;
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
            {!content ? null :
            <TreesIcon {...{color, size, viewBox}} {...bind()}>
                <g><path d={path}/></g>
            </TreesIcon>}
            <TreesType {...{color, type}}>{type}</TreesType>
            <TreesCont {...{color, size}}>{content}</TreesCont>
            <TreesMain {...{depth, size}} style={spring}>{main}</TreesMain>
        </TreesTop>
    )
}

export * from './hooks'
export * from './paths'
// <TreesTggl {...{...props, set, icon, opacity:children?.length?1:.3}}/>
