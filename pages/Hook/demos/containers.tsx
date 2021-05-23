import React from 'react'
import {useControl as _} from 'react-three-gui';
import {
    Notes as NotesTarget,
    // Sheet as SheetTarget,
    // Slide as SlideTarget,
    Split as SplitTarget,
    Trees as TreesTarget,
    Head, Card
} from '../../../src'

export const Notes = () => {
    const dark  = _('dark' , {type: 'boolean', value: false})
    const debug = _('debug', {type: 'boolean', value: false})
    const size  = _('size' , {type: 'number' , value: 1, min: 0, max: 2})
    const space = _('space', {type: 'number' , value:50, min: 0, max:100})
    const depth = _('depth', {type: 'number' , value: 0, min: 0, max: 2})
    const child = _('child', {type: 'number' , value: 3, min: 0, max: 10})
    return (
        <NotesTarget {...{dark, debug, size, space, depth:~~depth,
            children:[...Array(~~child)].map((_,i) =>
                <Card min={1} key={i} style={{
                    height:size*100,
                    background:`rgba(255,0,0,0.1)`}}>{i}</Card>
            )
        }} />
    )
}
// export const Sheet = () => {
//     const started = _('stared', {type: 'boolean', value: false})
//     const props = {
//         started,
//         children: <div style={{width: 100,height: 100, background:"red"}}/>
//     }
//     return <SheetTarget {...props}/>
// }
// export const Slide = () => {
//     const props = {
//         children: Array(5).fill(
//             <div style={{width:"100%",height:"100%",background: "red"}}/>
//         ),
//     }
//     return <SlideTarget {...props}/>
// }
export const Split = () => {
    const vertical = _('vertical', {type: 'boolean', value: false})
    const dark     = _('dark'    , {type: 'boolean', value: false})
    const size  = _('size'  , {type: 'number' , value: 1, min: 0, max: 2})
    const min   = _('min'   , {type: 'number' , value: 0, min: 0, max: 1})
    const length= _('length', {type: 'number' , value: 3, min: 0, max:10})
    return (
        <div style={{height:"50vh"}}>
            <SplitTarget {...{vertical,dark,size,min}}>
            {[...Array(~~length)].map((_, num) =>
                <div key={num} style={{width:"100%",height:"100%",background:`rgba(${[
                    `${num     % 3 * 255 / 3}`,
                    `${(num+1) % 3 * 255 / 3}`,
                    `${(num+2) % 3 * 255 / 3}`
                ].join(`, `)},.1)`}}/>
            )}
            </SplitTarget>
        </div>
    )
}
export const Trees = () => {
    const items = ['0', '1', '2', '3']
    const dark     = _('dark'     , {type: 'boolean', value: false})
    const open     = _('open'     , {type: 'boolean', value: true })
    const immediate= _('immediate', {type: 'boolean', value: true })
    const visible  = _('visible'  , {type: 'boolean', value: true })
    const depth    = _('depth'    , {type: 'number' , value: 0, min: 0, max: 2})
    const root     = _('root'     , {type: 'number' , value: 1, min: 0, max: 2})
    const size     = _('size'     , {type: 'number' , value: 1, min: 0, max: 2})
    const icon     = _('icon'     , {type: 'select' , value: 'Close' , items:['Minus','Plus','Close']})
    const content  = _('content'  , {type: 'select' , value: items[0], items})
    return (
        <Head {...{dark,size}}>
            <TreesTarget {...{dark,open,visible,immediate,depth,root,size,icon,content}}>
                <>
                    <>1</>
                    <>1 - 1</>
                    <>1 - 2</>
                </>
                <>
                    <>2</>
                    <>2 - 1</>
                    <>2 - 2</>
                </>
            </TreesTarget>
        </Head>
    )
}
