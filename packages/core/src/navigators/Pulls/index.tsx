import React from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import {usePulls} from './hooks'

const Wrap = styled<any>(animated.div)`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: all;
    overflow: hidden;
`

const Item = styled<any>(animated.div)`
    position: absolute;
    ${({align}) => `${align}: 0px;`}
    ${({align, width, size}) => align==="left"||align==="right"
        ? `width: ${width*size}px; height: 100%;`
        : `width: 100%; height: ${width*size}px;`}
`

export const Pulls = React.forwardRef((props: any, ref) => {
    const {align="bottom", width=100, size=1, style={}} = props;
    const [{x, y}, bind] = usePulls(props)
    return (
        <Wrap {...bind()} ref={ref} style={style}>
            <Item style={{x, y}} size={size} align={align} width={width}>
                {props.children}
            </Item>
        </Wrap>
    )
})
