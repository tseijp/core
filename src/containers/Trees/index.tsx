import React, {CSSProperties as CSS,Children,useMemo,useCallback} from 'react'
import {useTrees} from './hooks'
import {treesPaths, treesStyles} from './utils'
import {Props} from '../../types'
import {animated as a} from 'react-spring'

export type TreeIcons = {
    [key:string]: {(props:{style:CSS,onClick:()=>void,className?:string}): JSX.Element}
}
export const TreeIcons:TreeIcons = {
    CloseSquareO: props => <svg {...props} viewBox="64 -65 897 897"><g><path d={treesPaths.close}/></g></svg>,
    MinusSquareO: props => <svg {...props} viewBox="64 -65 897 897"><g><path d={treesPaths.minus}/></g></svg>,
    PlusSquareO : props => <svg {...props} viewBox="64 -65 897 897"><g><path d={treesPaths.plus}/></g></svg>,
    EyeO        : props => <svg {...props} viewBox="61  51 902 666"><g><path d={treesPaths.eye}/></g></svg>,
}

export function TreesContent (props: Props<{
    [key:string]:any, set:any, content:any, type:any,
    hide:boolean, opacity:number, root:number, icon:"Minus"|"Plus"|"Close"
}>): JSX.Element

export function TreesContent ({content,type,set,hide=false,icon="Close",opacity=1,dark=false}: any) {
    const Icon  = useMemo(() => TreeIcons[`${icon}SquareO`], [icon])
    const color = useMemo(() => dark? "#818181": "#212121", [dark])
    const eyeClick  = useCallback(() => set&&set((p:any) => ({...p        ,immediate:true })), [set])
    const iconClick = useCallback(() => set&&set((p:any) => ({open:!p.open,immediate:false})), [set])
    return !content ? null : (
        <>
            <Icon style={{...treesStyles.tggl, opacity, color}} onClick={iconClick}/>
            <span style={{...treesStyles.type, marginRight:type?10:0,color}}>{type}</span>
            { hide &&
            <TreeIcons.EyeO style={{...treesStyles.tggl, color}} onClick={eyeClick}/> }
            <span style={{...treesStyles.cont,color}}>{content}</span>
        </>
    )
}

export function Trees (props: any) {
    const {depth=0, root=1} = props
    const [{topStyle, childStyle, icon}, set] = useTrees(props)

    const children = useMemo(() => Children.map(props.children, child => {
        const grand = Children.toArray((child as any)?.props?.children) || []
        return props.children &&
            <Trees {...{...props,
                depth:depth+1, topStyle:{},
                open: depth<root, children: grand.length>1 ? grand.slice(1) : null,
                immediate: false, content : grand.length>1 ? grand[0] : child,}}/>
    }), [props, depth, root])

    return (
        <a.div style={topStyle}>
            <TreesContent {...{...props, icon, set, opacity:children?.length?1:.3}}/>
            <a.div style={childStyle}>{children}</a.div>
        </a.div>
    )
}
export * from './hooks'
export * from './utils'
