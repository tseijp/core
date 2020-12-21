import React from 'react'
import {Props} from '../types'
import styled from 'styled-components'

const Item = styled.div<any>`
    fontSize:size*50,
    color: ${props => props.color};
    width:${({size}) => `max(70vw, 100vw - ${size*200}px)`},
    height: auto;
    margin: auto;
`

export type Head = {
    (props: Props): JSX.Element
}
export const Head = React.forwardRef(({
    children, dark=false,size=1, style={}, ...props
}: any, ref) => {
    const color = props.color||dark? "#818181" : "#000"
    return <Item {...{children,ref,style,color,...props}}/>
})
