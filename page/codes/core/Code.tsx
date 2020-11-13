import React, {
    FC, //CSSProperties as CSS, //Children,
    //useMemo, useCallback, useState, useEffect, useRef
} from 'react'
import {useControl} from 'react-three-gui';
import {Code} from '../../../src'
const items = ['javascript', 'python']
const codes = [
`import React from 'react'

export const usePage = (props, config) => {
    if (typeof props ==="function")  props = props()
    if (typeof config==="function") config = config()
    const pageRef = React.useRef({...defaultPage, ...props })
    const confRef = React.useRef({...defaultConf, ...config})
    const [p,set] = React.useState( normPage(pageRef.current) )
    const setPage = React.useCallback((state) => {
        if (typeof state==="function")
            state = state(pageRef.current)
        pageRef.current = {...pageRef.current, ...state}
        set(pre => {
            const newPage = normPage(pageRef.current)
            if (pre.pathname===newPage.pathname)
                return newPage
            window.history.pushState('','',
                newPage.pathname instanceof Array
                  ? newPage.pathname[0]||''
                  : newPage.pathname   ||'')
            return  newPage
        })
    }, [set])
    React.useEffect(() => {
        const {onChange} = confRef.current
        typeof onChange==="function" && onChange()
    }, [p.id])
    return [p, setPage]
}`,]
export const HookCode:FC = () => {
    const dark  = useControl('dark'   , {type: 'boolean', value: false})
    const inline= useControl('inline' , {type: 'boolean', value: false})
    const size  = useControl('size'   , {type: 'number' , value: 1, min: 0, max: 2})
    const code     = useControl('code'    , {type: 'string', value:codes[0]})
    const language = useControl('language', {type: 'select', value:items[0], items})
    return (
        <Code {...{dark,inline,size,code,language}} />
    )
}
export const codeCode =
`import {Code} from '@tsei/core'
const codeCode = "hello"
const App =  => (
    <Code
        dark    = {false}
        inline  = {false}
        size    = {1}
        code    = {"javascript"}
        language= {"..."}/>
)`
