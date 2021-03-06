import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'
import {useCallback, useRef, useMemo} from 'react'
import { useGesture } from 'react-use-gesture'
import { useSprings, SpringValue } from 'react-spring'

const Wrap = styled(animated.div)`
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
`

const Item = styled(animated.div)`
    position: absolute;
    will-change: transform;
`

export function Slide (props: Partial<{
    width: number,
    visible: number,
    children: null | JSX.Element
}>): JSX.Element

export function Slide (props: any) {
    const [springs, bind] = useSlide(props)
    return (
        <Wrap {...bind()}>
          {React.Children.map(props.children, (children: any, i) =>
            <Item key={i} style={springs[i]} {...{children}}/>
          )}
        </Wrap>
    )
}

export function useSlide (props: Partial<{
    width: number,
    visible: number
}>): [{x: SpringValue<number>}[], (...args: any[]) => any]

export function useSlide ({children, width=600,visible=4}: any) {
    const len = useMemo(()=>
        (children.length>visible)
            ? children.length
            : visible
    , [children,visible])
    const idx = useCallback((x) => (x<0 ? x+len : x) % len, [len])
    const getPos = useCallback((i, firstVis, firstVisIdx) => idx(i - firstVis + firstVisIdx), [idx])
    const [s, set] = useSprings(len, i => ({ x : (i<len-1?i:-1)*width }) )
    const prev = useRef([0, 1])
    const drag = useRef(0)
    const wheel = useRef(0)
    const run = useCallback((xy, vxy)=>{
        const firstVis = idx(Math.floor(xy / width) % len)
        const firstVisIdx = (vxy<0)?len-visible:1
        set((i:any) => {
            const position     = getPos(i, firstVis       , firstVisIdx)
            const prevPosition = getPos(i, prev.current[0], prev.current[1])
            const rank = firstVis - (xy<0?len:0) + position - firstVisIdx
            const configPos = vxy > 0 ? position : len-position-1
            return {
                x: (-xy % (width*len)) + width*rank,
                immediate: vxy<0 ? prevPosition>position : prevPosition<position,
                config: { tension:(1+len-configPos)*100, friction:30+configPos*40 }
            }
        })
        prev.current = [firstVis, firstVisIdx]
    }, [idx, getPos, width, visible, set, len] )
    const bind = useGesture({
        onDrag :({offset:[x,],vxvy:[vx,]})=>vx&&(  drag.current=-x, run(wheel.current-x, -vx) ),
        onWheel:({offset:[,y],vxvy:[,vy]})=>vy&&( wheel.current= y, run(drag.current+y,  vy) ),
    })
    return [s, bind]
}
