import React from 'react';
import styled from 'styled-components'
import {Icon} from '../components'
import {useRef} from 'react';
import {useGesture} from 'react-use-gesture'
import {animated, useSpring, SpringValue, config, UseSpringProps} from 'react-spring'


export function useTrans (props: Partial<{
    size: number,
    onOpen: (...args: any[]) => any
}>): [{
    x: SpringValue<number>,
    y: SpringValue<number>,
    r: SpringValue<number>,
    s: SpringValue<number>
}, (...args: any[]) => any]

export function useTrans ({size=1, onOpen=()=>null}: any) {
    const opened = useRef<number>(1)
    const [spring, set] = useSpring<UseSpringProps>( () => ({x:0, y:0, r:90, s:1,}) )
    const getr = (v=0) => {
        const pre  = ~~(spring.r.animation.to/90) //  Math.round( spring.r.animation.to/90 || 0 ) //
        const unit = (opened.current === (pre%2)?0:1) ? 0:1 //to change:1 no diff:0
        return 90 * ( pre + unit * (v<0?-1:1) )
    }
    const run   =(v=0)=>1&&((opened.current=v), onOpen&&onOpen() )
    const open  =(v=0)=>1&&(run(1) ,set({r:getr(v),config:v!==0?config.wobbly:config.slow}))
    const close =(v=0)=>1&&(run(0),set({r:getr(v),config:{...config.stiff }}))
    const onBind=({mx=0,vx=0,down=false,last=false}) => {
        if (!last) return set({r:spring.r.animation.to+(down?2*(-mx)/size/500:0)})
        if(!opened.current) return (mx===0||mx<-size*250||vx<-0.5) ?  open(-vx) : close(-vx)
        if( opened.current) return (mx===0||mx<-size*250||vx<-0.5||0.5<vx) ? close(-vx) :  open(-vx)
    }
    const bind = useGesture({
        onHover: ({hovering}) => set({s:hovering?1.2:1}),
        onPinch: ({last,down,offset :[_,a]})  => onBind({down,last,vx:0,mx:a}),
        onDrag : ({last,down,vxvy:[vx,],movement:[mx,],}) => onBind({down,last,vx,mx:mx})
    })
    return [spring, bind]
}


export function Trans (props: Partial<{
    size: number,
    onOpen: (...args: any[]) => any
}>): JSX.Element

export function Trans (props: any) {
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
