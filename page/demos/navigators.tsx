import React from 'react'
import {useControl as _} from 'react-three-gui';
import {
    Pulls as PullsTarget,
    Sides as SidesTarget,
    Trans as TransTarget,
    Card
} from '../../src'


export const Pulls = () => {
    const open = _('open', {type: 'boolean', value: true})
    const dark = _('dark', {type: 'boolean', value: false})
    const size    = _('size',    {type: 'number', value: 1, min: 0, max: 2})
    const width   = _('width',   {type: 'number', value: 100, min: 0, max: 500})
    const timeout = _('timeout', {type: 'number', value: 5000, min: 0, max: 10000})
    const aligns = ['left', 'right', 'top', 'bottom']
    const align = _('align', {type: 'select', value: "top", items: aligns})
    const style = {position: "absolute", width: "100px", height: "100px", color: "rgba(0,255,0,.5)"}
    return (
        <Card min={500} rate={0}>
            <PullsTarget {...{dark, size, timeout, open, width, align}}>
                <span style={style as any} children="🤯"/>
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
