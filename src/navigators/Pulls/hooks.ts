// import { useState, useEffect } from "react"
import { useSpring, SpringValue, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
// import {clamp} from '../../utils'
import {Props} from '../../types'
export type PullsProps = Props<{
    height: number
}>

export function usePulls (props: PullsProps): [{
    y: SpringValue<number>
}, (...args: any) => any]
export function usePulls () {
    const [{y}, ] = useSpring(() => ({
        y: 100,
        config: config.stiff
    }))
    const bind = useGesture({
        onDrag: () => {}
    }, {domTarget: window})
    return [{y}, bind]
}
