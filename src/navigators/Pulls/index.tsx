import React from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import {usePulls, PullsProps} from './hooks'

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
    background: rgba(0, 0, 255, 0.5);
    ${({align}) => `${align}: 0px;`}
    ${({align, width, size}) => align==="left"||align==="right"
        ? `width: ${width*size}px; height: 100%;`
        : `width: 100%; height: ${width*size}px;`}
`

export type Pulls = {(props: PullsProps): JSX.Element}
export const Pulls = React.forwardRef((props: any, ref) => {
    const {align="bottom", width=50, size=1, style={}} = props;
    const [{x, y}, bind] = usePulls(props)
    return (
        <Wrap {...bind()} style={style} ref={ref}>
            <Item style={{x, y}} size={size} align={align} width={width}>
                {props.children}
            </Item>
        </Wrap>
    )
})
// const {size=1, className="spinner-grow"} = props
// <Item className={className} size={size} />
