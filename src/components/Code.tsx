import React, {FC, useCallback, useMemo} from "react";
import {LightAsync} from 'react-syntax-highlighter'
import {atomOneLight, atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {Props} from '../types'


export type Code = FC<Props<{
    code:string, language:string, inline:boolean
}>>
export const Code:Code = ({
    code='', language="javascript", inline=false, dark=false, size=1, style={}, ...props
}) => {
    const onDoubleClick = useCallback(()=>navigator.clipboard.writeText(code),[code])
    const customStyle = useMemo(()=>{
        return {...(inline?{verticalAlign:"top",padding:0}:{}),padding:"1rem",
            display:inline?"inline-block":"fixed", position:'relative', margin:0,}
    }, [inline])
    return <LightAsync useInlineStyles showLineNumbers={!inline}
                PreTag={inline? "span": "pre"}
                style={{...(dark?atomOneDark:atomOneLight),fontSize:`${size}rem`,...style}}
                {...{customStyle, onDoubleClick, language}}
                {...props}>
                {code}</LightAsync>
}
