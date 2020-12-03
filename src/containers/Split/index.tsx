import React, {Children} from 'react'
import {animated as a} from 'react-spring'
import {SplitProps} from './types'
import {useSplit} from './hooks'
import {Props} from '../../types'

export function Split (props: Props<SplitProps>): JSX.Element
export function Split (props: any) {
    const [styles, bind] = useSplit(props)
    return (
        <a.div style={{width:"100%",height:"100%",whiteSpace:"nowrap"}}>
            {Children.map(props.children, (children: any, key) =>
                <a.div style={styles(key)}
                    {...bind(key)}
                    {...{key, children}}/>
            )}
        </a.div>
    )
}
export * from './hooks'
export * from './types'
export * from './utils'
