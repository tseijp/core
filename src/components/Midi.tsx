/**
[springs, set] = useSprings
onClick = e => set(e.id)
<Midi onClick={onClick} items={4*4}/>
*/
import React from 'react'
import {is} from '../utils'

export function Midi <Item=any, Key=number>(porps: Partial<{
    as: 'button',
    items: Item[] | number
    onClick: (...args: any) => any,
    children: (item: Item, key: Key, src: Item[]) => null | JSX.Element
}>): null | JSX.Element

export function Midi (props: any) {
    const {items=[], onClick, as, children} = props
    const lastItems = is.num(items)? [...(Array(items))]: items
    const handleClick = (...args: any) => (e: any) => onClick({...e, args})
    return lastItems.map((...args: any) =>
        React.createElement(as, {onClick: handleClick(...args)}, is.fun(children) && children(...args))
    )
}
