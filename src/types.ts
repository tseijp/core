import { CSSProperties } from 'react'
// ************************* 🌌 For Containers 🌌 ************************* //
export type Based = {
    [key:string]:any, style?:CSSProperties,
    onOpen :null|(()=>void), dark :number|boolean, color:string, bind:any, spring:any,
    onClose:null|(()=>void), debug:number|boolean, size:number, className:string
}
export type Props<T extends {}={}> = Partial<T & Based>
