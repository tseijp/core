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
//     @springConfig, optional: react-spring animation config
import React, {
    CSSProperties as CSS, FC, Children,
    useCallback,useMemo, useState, useEffect, //useRef
} from 'react'
import {useSpring, config, animated as a} from 'react-spring'
import {Props} from '../types'
const defaultConfig = {restSpeedThreshold: 1,restDisplacementThreshold: 0.01}
const styles:{[key:string]:CSS} = {
    tree: {padding:'4px 0px 0px 0px',position:'relative',overflow:'hidden',
           verticalAlign:'middle',whiteSpace:'nowrap',textOverflow:'ellipsis',},
    tggl: {verticalAlign:'middle',width:'1em',height:'1em',cursor:'pointer',marginRight:10,},
    type: {verticalAlign:'middle',fontSize:'0.6em',fontFamily:'monospace',textTransform:'uppercase',},
    cont: {verticalAlign:'middle',display:"inline-block",},
    top: {willChange:'transform, opacity, height',marginLeft:6,},
}
const paths = {
    close:"M717.5 589.5q-10.5 10.5 -25.5 10.5t-26 -10l-154 -155l-154 155q-11 10 -26 10t-25.5 -10.5t-10.5 -25.5t11 -25l154 -155l-154 -155q-11 -10 -11 -25t10.5 -25.5t25.5 -10.5t26 10l154 155l154 -155q11 -10 26 -10t25.5 10.5t10.5 25t-11 25.5l-154 155l154 155 q11 10 11 25t-10.5 25.5zM888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0z",
    minus: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 347h-442q-14 0 -25 10.5t-11 25.5v0q0 15 11 25.5t25 10.5h442q14 0 25 -10.5t11 -25.5v0 q0 -15 -11 -25.5t-25 -10.5z",
    plus: "M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184 q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z",
    eye: "M963 384q0 14 -21 62q-26 65 -61 109q-57 71 -139 112q-99 50 -230 50t-231 -50q-80 -41 -138 -112q-34 -43 -61 -109q-21 -48 -21 -62v0v0v0v0q0 -14 21 -62q27 -66 61 -109q57 -71 139 -112q100 -50 230 -50t230 50q81 41 139 112q35 44 62 109q20 48 20 62v0v0v0v0z M889 384q-25 -77 -64 -126h-1q-46 -59 -114 -93q-85 -42 -198.5 -42t-198.5 42q-67 34 -114 93q-40 49 -65 126q25 77 65 126q47 59 114 93q85 43 199 43t198 -43q67 -33 114 -93q40 -49 65 -126zM512 558q-72 0 -122.5 -50.5t-50.5 -122.5t50.5 -122.5t122.5 -50.5 t122.5 50.5t50.5 122.5t-50.5 122.5t-122.5 50.5zM614 385q0 -42 -30 -72t-72 -30t-72 30t-30 72t30 72t72 30t72 -30t30 -72z",
}
export type TreeIcon = {[key:string]:FC<{style:CSS,onClick:()=>void,className?:string}>}
export const TreeIcon:TreeIcon = {
    CloseSquareO: props => <svg {...props} viewBox="64 -65 897 897"><g><path d={paths.close}/></g></svg>,
    MinusSquareO: props => <svg {...props} viewBox="64 -65 897 897"><g><path d={paths.minus}/></g></svg>,
    PlusSquareO : props => <svg {...props} viewBox="64 -65 897 897"><g><path d={paths.plus}/></g></svg>,
    EyeO        : props => <svg {...props} viewBox="61  51 902 666"><g><path d={paths.eye}/></g></svg>,
}
export type TreeContent = FC<Props<{
    [key:string]:any, set:any, content:any, type:any,
    hide:boolean, opacity:number, root:number, icon:"Minus"|"Plus"|"Close"
}>>
export const TreesContent:TreeContent = ({
    content,type,set,hide=false,icon="Close",opacity=1,dark=false,
}) => {
    const Icon  = useMemo(() => TreeIcon[`${icon}SquareO`], [icon])
    const color = useMemo(() => dark? "#818181": "#212121", [dark])
    const eyeClick  = useCallback(() => set&&set((p:any) => ({...p        ,immediate:true })), [set])
    const iconClick = useCallback(() => set&&set((p:any) => ({open:!p.open,immediate:false})), [set])
    return !content ? null : (
        <>
            <Icon style={{...styles.tggl, opacity, color}} onClick={iconClick}/>
            <span style={{...styles.type, marginRight:type?10:0,color}}>{type}</span>
            { hide &&
            <TreeIcon.EyeO style={{...styles.tggl, color}} onClick={eyeClick}/> }
            <span style={{...styles.cont,color}}>{content}</span>
        </>
    )
}
export type Trees = FC<Props<{
    open:boolean, visible:boolean, depth:number, springConfig:any,
    hide:boolean, immediate:boolean, topStyle:CSS, type:any, content:any,
}>>
export const Trees:Trees = ({
    open=true, visible=true, immediate=true,
    depth=0, root=1, springConfig=defaultConfig,
    dark=false, size=1, style={}, topStyle={}, ...props
}) =>  {
    const [state, set] = useState<{[key:string]:boolean}>({open,visible,immediate})
    const spring = useSpring({
        immediate: state.immediate,
        config: {...config.default,...springConfig},
        from: {height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: {  height: state.open ? 'auto' : 0,
              opacity: state.open ? 1      : 0,
            transform: state.open ? 'translate3d(0px,0,0)' : 'translate3d(20px,0,0)'},
    })
    const children = useMemo(() => Children.map(props.children, child => {
        const grand = Children.toArray((child as any)?.props?.children) || []
        return props.children &&
            <Trees {...{...props,
                dark, size, style, depth:depth+1, topStyle:{},
                open: depth<root, children: grand.length>1 ? grand.slice(1) : null,
                immediate: false, content : grand.length>1 ? grand[0] : child,}}/>
    }), [props, depth, root, dark, size, style])
    const icon = useMemo(() => children instanceof Array && children.length > 0
        ? (state.open ? 'Minus' : 'Plus')
        : 'Close', [children, state.open])
    useEffect(() => void (set(p => visible!==p.visible?{...p, visible}:p)), [visible])
    return (
        <a.div style={{...styles.tree, fontSize:size*50, zIndex:-depth, ...style, ...topStyle}}>
            <TreesContent{...{...props, icon, set, opacity:children?.length?1:.3, dark, size}}/>
            <a.div style={{
                ...(depth>0?{borderLeft:`1px dashed #${dark?818181:212121}`}:{}),
                ...styles.top, padding:`4px 0px 0px ${size*25}px`,
                ...spring, }}>{children}</a.div>
        </a.div>
    )
}
