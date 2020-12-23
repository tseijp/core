import React from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import {usePulls, PullsProps} from './hooks'

const Wrap = styled<any>(animated.div)`
    position: relative;
    width: 100%;
    height: 100%;
    bottom: 0px;
    pointer-events: all;
    background: rgba(255, 0, 0, 0.5);
`
const Item = styled<any>(animated.div)`
    background: rgba(0, 0, 255, 0.5);
    position: relative;
    display: grid;
    margin: 0px auto 0px auto;
    width: ${props => props.size*250}px;
    height: ${props => props.size*250}px;
`

export type Pulls = {(props: PullsProps): JSX.Element}
export const Pulls = React.forwardRef((props: any, ref) => {
    const [spring, bind] = usePulls(props)
    return (
        <Wrap {...bind()} ref={ref}>
            <Item style={spring}>
                {props.children}
            </Item>
        </Wrap>
    )
})
// const {size=1, className="spinner-grow"} = props
// <Item className={className} size={size} />
