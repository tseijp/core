import React from 'react'
import styled from 'styled-components'
import {animated as a, useSpring} from 'react-spring'

export function useGrow (props: any, ref: any) {
    const {
        active=true,
        dark=1,
        size=1,
        width=250,
        timeout=250,
    } = props
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
    return {style: {opacity, width: r, height: r}, dark, ref, size}
}

export const Grow = styled(React.forwardRef((p, r) => <a.div {...useGrow(p, r)}/>))
    .attrs<any>(_ => ({color: _.dark? "#818181": "#212121"}))<any>`
    top: 50%;
    left: 50%;
    margin: 0px;
    transform: translateX(-50%) translateY(-50%);
    border: 1rem solid ${props => props.color};
    background: ${props => props.color};
    border-radius: 100%;
    position: absolute;
`
