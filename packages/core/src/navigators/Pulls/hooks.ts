import { useCallback, useEffect, useRef } from "react"
import { useSpring, SpringValue } from 'react-spring'
import { useGesture } from 'react-use-gesture'

export type PullsProps = {
    onOpen: () => any,
    onClose: () => any,
    wheelRate: number,
    dragRate: number,
    timeout: number,
    width: number,
    align: string,
    limit: number,
    rate: number,
    open: boolean,
}

export function usePulls (props: PullsProps): [{
    x: SpringValue<number>,
    y: SpringValue<number>,
}, (...args: any) => any]

export function usePulls ({
    onOpen=()=> void null,
    onClose=()=> void null,
    wheelRate=-0.5,
    dragRate=1,
    timeout=0,
    width=100,
    align="bottom",
    limit=0,
    size=1,
    rate=1,
    open=false,
}) {
    const [spring, set] = useSpring(() => setup(width*size, align))
    const timeouted = useRef(false)
    const changed = useCallback((opened=1) => {
        set(opened? {x: 0, y: 0}:  setup(width*size, align))
        if (!opened && onClose) onClose()
        if ( opened && onOpen ) onOpen()
        if (timeout <= 0 || opened <= 0 || timeouted.current) return
        timeouted.current = true
        setTimeout(() => void (timeouted.current = false, changed(0)), timeout)
    }, [align, set, size, timeout, width, onOpen, onClose])
    const dist = width* size
    const axis = align==="bottom" || align==="top"  ? 1: 0
    const sign = align==="bottom" || align==="right"?-1: 1
    const bind = useGesture({
        onWheel: ({last, wheeling, movement}) => {
            const move = movement[axis] * wheelRate * rate
            const next = (wheeling? move: 0) - dist * sign
            const isLimited = limit && move > limit
            if (last || isLimited) changed(move* sign > dist)
            else set({[["x", "y"][axis]]: next, [["y", "x"][axis]]: 0});
        },
        onDrag: ({last, dragging, movement}) => {
            const move = movement[axis] * dragRate * rate
            const next = (dragging? move: 0) - dist * sign
            const end = limit && move * sign > limit
            if (last || end) changed(move* sign > dist)
            else set({[["x", "y"][axis]]: next, [["y", "x"][axis]]: 0});
        },
    })
    useEffect(() => void changed(open && align), [open, align, changed])
    return [spring, bind]
}

function setup (v: number, align:string): ({x: number, y: number})
function setup (v=0, align="bottom") {
    const x = ({top: 0, bottom:0, left:-v, right: v} as any)[align] || 0
    const y = ({top:-v, bottom:v, left: 0, right: 0} as any)[align] || 0
    return {x, y}
}
