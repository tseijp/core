import React from 'react'
import {useControl as _} from 'react-three-gui';
import {
    Pulls as PullsTarget,
    Sides as SidesTarget,
    Trans as TransTarget,
    Card
} from '../../src'


export const Pulls = () => {
    // const aligns = ['left', 'right', 'top', 'bottom']
    // const open = _('default', {type: 'boolean', value: true})
    // const wide = _('wide', {type: 'number', value: 200, min: 0, max: 500})
    // const align = _('align', {type: 'select', value: aligns[3], items: aligns})
    const style = {width: "100%", height: "100%", color: "rgba(0,255,0,.5)"}
    return (
        <Card>
            <PullsTarget>
                <span style={style} children="🤯"/>
            </PullsTarget>
        </Card>
    )
}
export const Sides = () => {
    const dark     = _('dark'    , {type: 'boolean', value: false})
    const size  = _('size'  , {type: 'number' , value: 1, min: 0, max: 2})
    return (
        <Card min={500} rate={0}>
            <SidesTarget {...{dark,size}}>
                <span>Home</span>
                <span>Hook</span>
                <span>Note</span>
            </SidesTarget>
        </Card>
    )
}
export const Trans = () => {
    const dark     = _('dark'    , {type: 'boolean', value: false})
    const size  = _('size'  , {type: 'number' , value: 1, min: 0, max: 2})
    return (
        <Card min={500} rate={0}>
            <TransTarget {...{dark, size}}>
                <div>{dark?'🌞':'🌛'}</div>
                <div>{dark?'👨':'👶'}</div>
                <div>{dark?'😆':'😃'}</div>
                <div>{dark?'👈':'🎴'}</div>
                <div>{dark?'👈':'🍖'}</div>
            </TransTarget>
        </Card>
    )
}
