import React from 'react'
import {is} from '../../src'
import styled from 'styled-components'
import {atom, useAtom} from 'jotai'

import {Lpad, Midi} from './packages/react/src'

const lpadAtom = atom(
    new Map<number, any>(),
    (get, set, props: any) => {
        const {id=0, type, width=0, height=0} = props
        if (!type) return
        else if (type === 'button') {
            get(lpadAtom).set(id, props)
            set(mixerAtom, props)
        }
        else if (type === 'slider') {
            const length = props.isVertical? width: height
            get(lpadAtom).set(id, props)
            set(mixerAtom, props)
        }
    }
)

// [[0, 1, 2, 3], {type: button}]

const mixerAtom = atom (
    new Map<number[], any>(),
    (get, set, [id, args]) => {
        get(mixerAtom).set(id, args)
    }
)


const StyledLpad = styled(Lpad)`
  background: rgba(${[...Array(3)].map(() => Math.random()) + ""});
`

export default function (props: any) {
    const [lpad] = useAtom(lpadAtom)
    console.log(lpad)
    return Array.from(lpad).map((l: any, key) =>
        <StyledLpad {...l} key={key}/>
    )
}
