import React from 'react'
import {animated} from 'react-spring'
import styled from 'styled-components'
import {useEdit} from './hooks'

const Input = styled<any>(animated.input)`
    margin: 25px;
`

export type Edit = {
    (props: {}): JSX.Element
}

export const Edit = (props: any) => {
    const [spring, bind] = useEdit(props)
    return <Input {...bind()} {...props} style={spring}></Input>
}

export * from './hooks'
