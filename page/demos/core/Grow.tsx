import React, {
    FC, //CSSProperties as CSS, Children,
    //useMemo, useCallback, useState, useEffect, useRef
} from 'react'
import {useControl} from 'react-three-gui';
import {Grow as Target} from '../../../src'

export const Grow:FC = () => {
    const dark  = useControl('dark' , {type: 'boolean', value: false})
    const size  = useControl('size' , {type: 'number' , value: 1, min: 0, max: 2})
    return (
        <Target {...{dark, size}}/>
    )
}
