import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {animated} from 'react-spring'
import {Props} from '../types'

const Item = styled<any>(animated.div)`
    position: relative;
    display: grid;
    margin: ${props => props.size*50}px auto 0 auto;
    width: ${props => props.size*250}px;
    height: ${props => props.size*250}px;
`

export type Grow = {
    (props: Props): JSX.Element
}
export const Grow = React.forwardRef(({
    onView=null,
    size=1, className="spinner-grow"//, ...props
}: any, forwardRef) => {
    const fn = useRef()
    const ref = useRef(null)
    React.useImperativeHandle(forwardRef, () => ref.current)
    useEffect(()=>{fn.current = onView}, [onView])
    return <Item {...{ref,size,className}} />
}
)
