import React from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components'
import {Props} from '../../types'
import {useSheet} from './hooks'

const Wrap = styled<any>(animated.div)`
    bottom: ${({height}) => `calc(-100vh + ${height-100}px)`};
    left: 2vw;
    width: 96vw;
    height: calc(100vh + 100px);
    z-index: 1;
    position: fixed;
    background: rgba(0,0,0,0);
    touch-action:  none;
    border-radius: 4em 4em 0px;
`

export function Sheet (props: Props<{
    height: number,
    started: false,
    children:JSX.Element | string,
    onOpen: (...args: any) => any,
    onClose: (...args: any) => any,
}>): JSX.Element

export function Sheet (props: any) {
    const [{y}, bind] = useSheet(props)
    const display = y.to((py=0) => (py < props.height?'block':'none'))
    return (
        <Wrap {...bind()} height={props.height} style={{y,display}}>
            {props.children}
        </Wrap>
    )
}

export * from './hooks'
