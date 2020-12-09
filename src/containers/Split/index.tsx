import React, {Children} from 'react'
import {animated} from 'react-spring'
import styled from 'styled-components'
import {SplitProps} from './types'
import {useSplit} from './hooks'
import {Props} from '../../types'

const SplitWrapp = styled<any>(animated.div)`
    width: 100%;
    height: 100%;
    whiteSpace: nowrap;
`
const SplitChild = styled<any>(animated.div)``

export function Split (props: Props<SplitProps>): JSX.Element
export function Split (props: any) {
    const [styles, bind] = useSplit(props)
    return (
        <SplitWrapp style={props.style}>
            {Children.map(props.children, (children: any, key) =>
                <SplitChild style={styles(key)}
                    {...bind(key)}
                    {...{key, children}}/>
            )}
        </SplitWrapp>
    )
}
export * from './hooks'
export * from './types'
export * from './utils'
