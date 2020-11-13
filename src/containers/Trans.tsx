import React, {FC,CSSProperties as CSS,useCallback,useRef} from 'react';
import {useSpring, animated as a, config, UseSpringProps} from 'react-spring'
import {useGesture} from 'react-use-gesture'
import {Props} from '../types'
import {Icon} from '../components'

const styles:{[key:string]:CSS} = {
    top : {position:"fixed",top:0,right:0,zIndex:100                        },//*dev*/, background:"rgba(0,0,0,.1)"},
    area: {position:"fixed",top:0,right:0,height:"100%"                     },//*dev*/,background:"rgba(255,0,0,.1)"},
    cont: {position:"fixed",height:`96%`,top:"2%",right:0,overflowX:"hidden"},//*dev*/,background:"rgba(0,255,0,.1)"},
    icon: {position:"absolute",right:0,transform:`translate(-50%,-50%)`     },//*dev*/,background:"rgba(0,0,255,.1)"},
    item: {backgroundColor:"#212121",color:"#818181", display:"inline-block"},
}
export const TransArea :FC<Props> = ({size=1, spring}) =>
    <a.div style={{
        width: spring.r.interpolate((r:number)=>`${
            50*size*( Math.cos(r/90*Math.PI)+1.5)
        }px`),
        background: spring.scale.interpolate((s:number)=>[
            `linear-gradient(90deg`,
            `rgba(0,0,0,0)`,
            `rgba(0,0,0,${s-1}))`
        ].join(',')),
        ...styles.area}}
       />

export const TransIcon : FC<Props> = ({size=1, spring, circ=false}) =>
    <a.div style={{...styles.icon, top:50*size, rotateZ:spring.r}}>
        <Icon fa="align-justify" {...{circ,size}} />
    </a.div>

export const TransContainer : FC<Props> = ({children, size=1, spring, }) =>
    <a.div style={{...styles.cont,
        width:spring.r.interpolate((r=0) => `${ 50*size*(Math.cos(r/90*Math.PI)+1) }px` )}}>
        <div style={{margin:`calc(${50*size*2}px - 2%) 0px 0px 0px`}}>{children}</div>
    </a.div>

export const TransItem :FC<Props> = ({children, size=1}) =>
    <a.div style={{...styles.item,
        margin:`${50*size/4}px 0px`,
        borderRadius:`${50*size}px 0px  0px ${50*size}px`,}}>
        <div onClick={e=>e?.stopPropagation()} style={{
            height:50*size, margin:`auto ${50*size/2}px`,
            fontSize:50*size, zIndex:1, display:"flex", alignItems:"center",
        }}>{children}</div>
    </a.div>

export const Trans : FC<Props> = ({children, size=1, onOpen=()=>null}={}) => {
    const opened = useRef<boolean>(false)
    const setOpened = useCallback((bool:boolean)=>1&&( (opened.current=bool), onOpen&&onOpen() ),[onOpen])
    const [spring, set] = useSpring<UseSpringProps>( () => ({x:0, y:0, r:90, scale:1,}) )
    const getr = (velocity=0) => {
        const pre  = ~~(spring.r.animation.to/90) //  Math.round( spring.r.animation.to/90 || 0 ) //
        const unit = ((opened.current?1:0) === (pre%2)?0:1) ? 0:1 //to change:1 no diff:0
        return 90 * ( pre + unit * (velocity<0?-1:1) )
    }
    const open  =(v=0)=>1&&(setOpened(true) ,set({r:getr(v),config:v!==0?config.wobbly:config.slow}))
    const close =(v=0)=>1&&(setOpened(false),set({r:getr(v),config:{...config.stiff }}))
    const onBind=({mx=0,vx=0,down=false,last=false}) => {
        if (!last) return set({r:spring.r.animation.to+(down?2*(-mx)/size/500:0)})
        if(!opened.current) return (mx===0||mx<-size*250||vx<-0.5) ?  open(-vx) : close(-vx)
        if( opened.current) return (mx===0||mx<-size*250||vx<-0.5||0.5<vx) ? close(-vx) :  open(-vx)
    }
    const bind = useGesture({
        onHover: ({hovering}) => set({scale:hovering?1.2:1}),
        onPinch: ({last,down,offset :[_,a]})  => onBind({down,last,vx:0,mx:a}),
        onDrag : ({last,down,vxvy:[vx,],movement:[mx,],}) => onBind({down,last,vx,mx:mx})
    })
    return (
        <a.div {...bind()} style={{...styles.top}}>
            <TransIcon      {...{size, spring, }} />
            <TransArea      {...{size, spring, }} />
            <TransContainer {...{size, spring, }} >
            {React.Children.map(children, ((child, key:number)=>
                <TransItem {...{size/*, spring*/, key}} >{child}</TransItem>
            ))}
            </TransContainer>
        </a.div>
    )
}
