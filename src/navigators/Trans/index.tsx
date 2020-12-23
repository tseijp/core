import React from 'react';
import {animated} from 'react-spring'
import styled from 'styled-components'
import {useTrans} from './hooks'
import {Props} from '../../types'
import {Icon} from '../../components'

const TransTop = styled.div<any>`
    top: 0px;
    right: 0px;
    z-index: 100;
    background: rgba(0,0,0,0.1);
`
const TransArea = styled<any>(animated.div)`
    top: 0px;
    right: 0px;
    height: 100%;
    position: absolute;
`
const TransIcon = styled<any>(animated.div)`
    top: ${({size}) => 25*size}px;
    right: ${({size}) => 25*size}px;
    transform: translate(-50%,-50%);
    position: absolute;
`
const TransWrap = styled<any>(animated.div)`
    margin: ${({size}) => `calc(${50*size*2}px - 2%) 0px 0px 0px`};
    height: 96%;
    top: 2%;
    right: 0px;
    overflow-x: hidden;
    position: absolute;
`
const TransItem = styled<any>(animated.div)`
    margin: ${({size}) => `${50*size/4}px 0px`};
    border-radius: ${({size}) => `${50*size}px 0px  0px ${50*size}px`};
    color: #818181;
    display: inline-block;
    background-color: #212121;
`
const TransToggle = styled.div<any>`
    font-size: ${({size}) => 50*size}px;
    height: ${({size}) => 50*size}px;
    margin: ${({size}) => `auto ${50*size/2}px`};
    align-items: center;
    display: flex;
    z-index: 1;
`
export type Trans = {
    (prosp: Props<{
        size: number,
        onOpen: (...args: any[]) => any
    }>): JSX.Element
}
export const Trans = (props: any) => {
    const {size, children} = props
    const [{r, s}, bind] = useTrans(props)
    const [wrap, area] = [
        {width: r.to((r=0) => `${ 50*size*(Math.cos(r/90*Math.PI)+1) }px`)},
        {width: r.to((r:number)=>`${
            50*size*( Math.cos(r/90*Math.PI)+1.5)
        }px`),
        background: s.to((s:number)=>[
            `linear-gradient(90deg`,
            `rgba(0,0,0,0)`,
            `rgba(0,0,0,${s-1}))`
        ].join(','))},
    ]
    return (
        <TransTop {...bind()}>
            <TransIcon size={size} style={{rotateZ: r}}>
                <Icon fa="align-justify" circ={false} size={size}/>
            </TransIcon>
            <TransArea size={size} style={area}/>
            <TransWrap size={size} style={wrap}>
                {React.Children.map(children, ((child, key:number)=>
                    <TransItem size={size} key={key}>
                        <TransToggle size={size} children={child}/>
                    </TransItem>
                ))}
            </TransWrap>
        </TransTop>
    )
}
