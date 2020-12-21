import React, {FC} from 'react'
import {useControl as use} from 'react-three-gui';
import {Split as Target} from '../../../src'

export const Split:FC = () => {
    const dark     = use('dark'    , {type: 'boolean', value: false})
    const vertical = use('vertical', {type: 'boolean', value: false})
    const size  = use('size'  , {type: 'number' , value: 1, min: 0, max: 2})
    const min   = use('min'   , {type: 'number' , value: 0, min: 0, max: 1})
    const length= use('length', {type: 'number' , value: 3, min: 0, max:10})
    return (
        <div style={{height:"50vh"}}>
            <Target {...{vertical,dark,size,min}}>
            {[...Array(~~length)].map((_, num) =>
                <div key={num} style={{width:"100%",height:"100%",background:`rgba(${[
                    `${num     % 3 * 255 / 3}`,
                    `${(num+1) % 3 * 255 / 3}`,
                    `${(num+2) % 3 * 255 / 3}`
                ].join(`, `)},.1)`}}/>
            )}
            </Target>
        </div>
    )
}
