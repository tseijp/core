import React, {useMemo} from 'react'
import { useSpring, animated as a} from 'react-spring'
import { useMove } from 'react-use-gesture'
import styled from 'styled-components'

export function useIcon (props: any, ref: any) {
    const {fa="", fab="", dark=false, circ=true, size=1, ...other} = props
    const [{xys}, set] = useSpring(() => ({xys:[0,0,0]}))
    const bind = useMove(({vxvy:[vx,vy],last}) => set({xys:[vx,vy,last?0:1]}))
    const color = useMemo(()=>props.color||circ
        ? dark?"#818181":"#fff"
        : "#212121",[props.color,circ,dark])
    const className = useMemo(() =>
        props.className + fa
             ? ` fas fa-${fa }`: fab
             ? ` fab fa-${fab}`: "", [props.className, fa, fab])
    const style = {
        filter: xys.to((x,y,s) => [
            `drop-shadow(${0.1+x}rem`, // -x~0.5~x
                        `${0.5+y}rem`, // -y~1.5~y
                        `${1-s/2}rem`, // 1 =hover=> 0.5
            `rgba(0,0,0, ${0.5+s/20}))`// 0.50 =hover=> 0.55
        ].join(' ')),
        transform: xys.to((x,y,s) => [
            `perspective(${size*50}px)`,
            `rotateX(${-y}deg)`,//-1 ~ 1
            `rotateY(${x}deg)` ,//-1 ~ 1
            `scale(${1+s/10})` ,// 1 ~ 1.1
        ].join(' '))} as any
    return {...other, ...bind(), style, className,color,size, ref}
}

export const Icon = styled<any>(React.forwardRef((p, r) => <a.div {...useIcon(p, r)}/>))`
    top: 0px;
    right: 0px;
    padding: 0px;
    text-align: center;
    user-select: none;
    color: ${props => props.color};
    width: ${({size=1}) => size*50}px;
    height: ${({size=1}) => size*50}px;
    font-size: ${({size=1}) => size*50}px;
    border-radius: ${({size=1}) => size*50}px;
    background: ${props => props.circ? "#212121": ""};
`
