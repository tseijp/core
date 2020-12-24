import { useCallback, useEffect, useRef } from "react"
import { useSpring, SpringValue } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {Props} from '../../types'
export type PullsProps = Props<{
    timeout: number,
    width: number,
    align: string,
    open: boolean,
}>

export function usePulls (props: PullsProps): [{
    x: SpringValue<number>,
    y: SpringValue<number>,
}, (...args: any) => any]

export function usePulls ({
    timeout=-1,
    width=50,
    align="bottom",
    size=1,
    open=false,
}) {
    const [spring, set] = useSpring(() => setup(width*size, align))
    const timeouted = useRef(false)
    const changed = useCallback((opened=1) => {
        set(opened? {x: 0, y: 0}:  setup(width*size, align))
        if (timeout <= 0 || opened <= 0 || timeouted.current) return
        timeouted.current = true
        setTimeout(() => void (timeouted.current = false, changed(0)), timeout*1000)
    }, [align, set, size, timeout, width])
    const bind = useGesture({
        onDrag : ({last, down, movement}) => {
            const axis = align==="bottom" || align==="top"  ? 1: 0
            const sign = align==="bottom" || align==="right"?-1: 1
            const move = movement[axis]
            const dist = width* size
            const newx = (down?move: 0) - dist*sign
            if (last) return void changed(move* sign > dist)
            set({[["x", "y"][axis]]: newx, [["y", "x"][axis]]: 0});
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
