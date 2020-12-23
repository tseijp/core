import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'
import { useSlide } from './hooks'
import { Props } from '../../types'

const Wrap = styled(animated.div)`
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
`

const Item = styled(animated.div)`
    position: absolute;
    will-change: transform;
`

export function Slide (props: Props<{
    width: number,
    visible: number
}>): JSX.Element

export function Slide (props: any) {
    const [springs, bind] = useSlide(props)
    return (
        <Wrap {...bind()}>
        {React.Children.map(props.children, (children: any, i) =>
            <Item key={i} style={springs[i]} {...{children}}/>
        )}
        </Wrap>
    )
}
// export * from './utils'
export * from './hooks'
