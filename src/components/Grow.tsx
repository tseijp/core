import React from 'react'
import styled from 'styled-components'
import {animated, useSpring} from 'react-spring'
import {Props} from '../types'

const Item = styled<any>(animated.div)`
    top: 50%;
    left: 50%;
    margin: 0px;
    transform: translateX(-50%) translateY(-50%);
    border: 1rem solid ${props => props.color};
    background: ${props => props.color};
    border-radius: 100%;
    position: absolute;
`

export type Grow = {(props: Props): JSX.Element}
export const Grow = React.forwardRef(({
    active=true,
    dark=1,
    size=1,
    width=250,
    timeout=250,
}: any, ref) => {
    const [close, set] = React.useState(false)
    const {opacity, r} = useSpring({
        reset: true,
        from: { opacity: 1, r: 0},
        to: (active && !close)
            ? async next => {
                await next({ opacity: 0, r: width * size})
                set(true)
                setTimeout(() => void set(false), timeout)
            }
            : { opacity: 1, r: 0}
    })
    return close? null:  (
        <Item style={{opacity, width: r, height: r}}
            color={dark? "#818181": "#212121"}
            ref={ref}
            size={size}/>
    )
})
