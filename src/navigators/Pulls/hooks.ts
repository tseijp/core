import { useRef, useMemo, useEffect } from "react"
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
    const opened = useRef<number>(open? 1: 0)
    const [spring, set] = useSpring(() => setup(width*size, align))
    const [expanded, collapsed] = useMemo(() => {
        const changed = (v=1) => {
            opened.current = v;
            if (timeout <= 0 || v !== 1) return
            setTimeout(() => collapsed(), timeout*1000)
        }
        return [
            () => void (changed(1), set({x:0 ,y:0})),
            () => void (changed(0), set({...setup(width*size, align)}))
        ]
    }, [align, set, size, timeout, width])
    const bind = useGesture({
        onDrag : ({last,down,movement}) => {
            const axis = align==="bottom" || align==="top"  ? 1: 0
            const sign = align==="bottom" || align==="right"? 1: -1
            const move = movement[axis]
            if(!last) return void set({[["x", "y"][axis]]: (down?move: 0) + width*size*sign, [["y", "x"][axis]]: 0});
            if(!opened.current) (move**2 > width**2*size)? expanded(): collapsed();
            if( opened.current) (move**2 < width**2*size)? collapsed(): expanded();
        },
    })
    useEffect(() => void (open && align? expanded(): collapsed()), [open, align, expanded, collapsed])
    return [spring, bind]
}

function setup (v: number, align:string): ({x: number, y: number})
function setup (v=0, align="bottom") {
    const x = ({top: 0, bottom:0, left:-v, right: v} as any)[align] || 0
    const y = ({top:-v, bottom:v, left: 0, right: 0} as any)[align] || 0
    return {x, y}
}
