import React, {CSSProperties as CSS, FC, useMemo} from 'react'
import {Props} from '../types'
import { useSpring, animated as a } from 'react-spring'
import { useMove } from 'react-use-gesture'
export type Icon = FC<Props<{fa:string,fab:string,circ:boolean,onOpen:null|(()=>void)}>>
export const Icon:Icon = ({
    fa="",fab="",dark=false,circ=true,size=1,onOpen=null, //onClose=null,
    children,className='',...props//,color=''
}) => {
    const [{xys}, set] = useSpring(() => ({xys:[0,0,0]}))
    const bind = useMove(({vxvy:[vx,vy],last}) => set({xys:[vx,vy,last?0:1]}))
    const color = useMemo(()=>props.color||circ
        ? dark?"#818181":"#fff"
        : "#212121",[props.color,circ,dark])
    const style = useMemo<CSS>(() => ({
        padding:"0px",top:0,right:0,textAlign:"center",userSelect:"none",
        ...(circ?{borderRadius:size*50,background:"#212121"}:{}),
        ...props.style,color,height:size*50,width:size*50,fontSize:size*50
    }), [size,circ,color,props.style] )
    return <a.div style={{
                x : xys.interpolate((x,y,s) => x*size*50+y*s),
                y : xys.interpolate((x,y,s) => y*size*50+x*s),
                filter : xys.interpolate((x,y,s) => [
                    `drop-shadow(${0.1+x}rem`, // -x~0.5~x
                                `${0.5+y}rem`, // -y~1.5~y
                                `${1-s/2}rem`, // 1 =hover=> 0.5
                    `rgba(0,0,0, ${0.5+s/20}))`// 0.50 =hover=> 0.55
                ].join(' ')),
                transform : xys.interpolate((x,y,s) => [
                    `perspective(${size*50}px)`,
                    `rotateX(${-y}deg)`,//-1 ~ 1
                    `rotateY(${x}deg)` ,//-1 ~ 1
                    `scale(${1+s/10})` ,// 1 ~ 1.1
                ].join(' ')),
            ...style} as CSS}
           {...{children,className:className+fa
                ?` fas fa-${fa}`: fab
                ?` fab fa-${fab}`: ""}}
           {...bind()} {...props} />
}
