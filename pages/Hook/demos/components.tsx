import React from 'react'
import {useControl as _} from 'react-three-gui';
import {
    Card as CardTarget,
    // Edit as EditTarget,
    Grow as GrowTarget,
    Head as HeadTarget,
} from '../../../src'

export const Head = () => {
    const titles = ["home", "note", "mdmd", "hook"]
    const dark  = _('dark' , {type: 'boolean', value: false})
    const size  = _('size' , {type: 'number' , value: 1, min: 0, max: 2})
    const children = _('children', {type: 'select' , value: titles[0], items: titles})
    const style = {margin: "50px"}
    return <HeadTarget {...{dark, size, children, style}}/>
}
export const Card = () => {
    const colors = ["black","white",]
    const dark  = _('dark' , {type: 'boolean', value: true})
    const size  = _('size' , {type: 'number' , value: 1, min: 0, max: 2})
    const space = _('space', {type: 'number' , value: 0, min: 0, max: 500})
    const rate  = _('rate' , {type: 'number' , value: 1, min:-5, max: 5})
    const min   = _('min'  , {type: 'number' , value: 0, min: 0, max: 500})
    const max   = _('max'  , {type: 'number' , value: 0, min: 0, max: 500})
    const color    = _('color'   , {type: 'select' , value: colors[0], items: colors})
    const children = _('children', {type: 'select' , value: colors[0], items: colors})
    const style = {
        padding:"auto auto",
        fontSize:100,
        textAlign:"center",
        verticalAlign:"middle",
        color,
        margin:`${size*100}px auto ${size*100}px auto`
    }
    return <CardTarget {...{dark,size,space,rate,min,max,children,style}}/>
}

// export const Edit = () => {
//     const dark  = _('dark' , {type: 'boolean', value: false})
//     const size  = _('size' , {type: 'number' , value: 1, min: 0, max: 2})
//     return <EditTarget {...{dark, size}}/>
// }

export const Grow = () => {
    const dark  = _('dark' , {type: 'boolean', value: false})
    const size  = _('size' , {type: 'number' , value: 1, min: 0, max: 2})
    return <GrowTarget {...{dark, size}}/>
}
