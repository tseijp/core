import { CSSProperties } from 'react'
export type Props<T extends {}={}> = Partial<T & {
    [key:string]:any, style?:CSSProperties,
    onClose: null|(()=>void),
    onOpen: null|(()=>void),
    debug: number|boolean,
    dark: number|boolean,
    size: number,
    className: string,
    color: string,
    bind: any,
    spring: any,
}>
