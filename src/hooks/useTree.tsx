import {Children, useMemo, useRef} from 'react'
export const useTree = <T extends any>(
    children:T, render:(grand:T[])=>any,
) => {
    const ref = useRef(render)
    const ret = useMemo(() =>
        Children.map(children, (child) => {
            const grand = Children.toArray((child as any)?.props?.children) || []//count(child.props.children) || 0
            return ref.current(grand as T[])
        })
    , [children])
    return ret
}
// Notes
//     const children = useMemo(() => Children.map(props.children, (child) => {
//         const grand = Children.toArray((child as any)?.props?.children) || []//count(child.props.children) || 0
//         return (grand.length>1 && depth===0) // TODO for depth > 0
//             ? React.cloneElement(child as any, {children:grand[0], grandren:(
//                 <Notes {...{...props, depth:depth+1,children:grand.slice(1)}}/> )})
//             : child
//     }), [depth, props])
// to
//     const children = useTree(children, (grand) => grand.length>1 && depth===0
//         ? React.cloneElement(child as any, {children:grand[0], grandren:(
//             <Notes {...{...props, depth:depth+1,children:grand.slice(1)}}/> )})
//         : grand)
// Trees
//     const children = useMemo(() => Children.map(props.children, child => {
//         const grand = Children.toArray((child as any)?.props?.children) || []
//         return props.children &&
//             <Trees {...{...props,
//                 dark, size, style, depth:depth+1, topStyle:{},
//                 open:depth<root, children:grand.length>1 ? grand.slice(1) : null,
//                 immediate:false, content:grand.length>1 ? grand[0] : child,}}/>
//     }), [props, dark, size, style, depth, root])
