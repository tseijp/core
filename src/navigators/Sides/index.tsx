import React from 'react';
import {animated} from 'react-spring'
import styled from 'styled-components'
import {useSides, SidesProps} from './hooks'
import {Icon} from '../../components'

const SidesTop = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`
const SidesArea = styled<any>(animated.div)`
    background: linear-gradient(90deg,rgba(255,0,0,.5),rgba(255,0,0,0));
    top: 0;
    left: 0;
    height: 100%;
    transition: 0.25s;
    position: absolute;
`

const SidesWrap = styled<any>(animated.div)`
    top: 2%;
    left: 0px;
    height: 96%;
    padding-top: ${({size=1}) => size*50}px;;
    border-radius: ${({size=1}) => `0px ${50*size}px ${50*size}px 0px`};
    overflow-x: scroll;
    background: #212121;
    position: absolute;
`
const SidesIcon = styled<any>(animated.div)`
    top: ${({size=1}) => 25*size}px;
    left: ${({size=1}) => 25*size}px;
    position: absolute;
`
const SidesItem = styled<any>(animated.div)`
    color: #818181;
    display: block;
    padding: 10px 10px 10px 50px;
    transition: 0.75s;
    font-size: ${({size=1}) => 50*size}px;
`
export type Sides = {(props: SidesProps): JSX.Element}

export const Sides = (props: any) => {
    const {size, fa="align-left", children} = props
    const [{x, y, s}, bind] = useSides(props)
    const [wrap, area] = [
            {width: x.to((x:number) => x>0? x: 0)},
            {width: x.to((x:number) => x>0? "100%": `${size*25}px`),
            background: s.to((s:number) => {
                const rate = (x.animation.to as number)/window.innerWidth+s-1
                return `linear-gradient(90deg,rgba(0,0,0,${rate}),rgba(0,0,0,0))`
            })}
    ]
    return (
        <SidesTop style={props.style}>
            <SidesIcon {...bind()} size={size} style={{x, y, scale: s}}>
                <Icon fa={fa} size={size} circ={false}/>
            </SidesIcon>
            <SidesArea {...bind()} size={size} style={area}/>
            <SidesWrap {...bind()} size={size} style={wrap}>
                {React.Children.map(children, ((child, key) =>
                    <SidesItem children={child} key={key} size={size}/>
                ))}
            </SidesWrap>
        </SidesTop>
    )
}
