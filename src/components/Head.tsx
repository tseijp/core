// import React from 'react'
import styled from 'styled-components'

export const Head = styled.div.attrs<any>(_ => ({
    size: _.size ?? 1,
    dark: _.dark ?? false,
    color: _.color ?? _.dark? "#818181" : "#000"
}))<any>`
    font-size: ${({size}) => size*50}px;
    color: ${props => props.color};
    width:${({size}) => `max(70vw, 100vw - ${size*200}px)`};
    height: auto;
    margin: auto;
`
