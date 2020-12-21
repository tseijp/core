import React, {FC} from 'react'
import {useControl} from 'react-three-gui';
import {Notes as Target, Card} from '../../../src'

export const Notes:FC = () => {
    const dark  = useControl('dark' , {type: 'boolean', value: false})
    const debug = useControl('debug', {type: 'boolean', value: false})
    const size  = useControl('size' , {type: 'number' , value: 1, min: 0, max: 2})
    const space = useControl('space', {type: 'number' , value:50, min: 0, max:100})
    const depth = useControl('depth', {type: 'number' , value: 0, min: 0, max: 2})
    const child = useControl('child', {type: 'number' , value: 3, min: 0, max: 10})
    return (
        <Target {...{dark, debug, size, space, depth:~~depth}}>
        {[...Array(~~child)].map((_,i) =>
            <Card min={1} key={i} style={{
                height:size*100,
                background:`rgba(255,0,0,0.1)`}}>{i}</Card>
        )}
        </Target>
    )
}
