import React, {FC,CSSProperties as CSS,useCallback,useRef} from 'react';
import {useSpring, animated as a, config} from 'react-spring'
import {useGesture} from 'react-use-gesture'
import {Props} from'../types'
import {Trees} from '../containers'
import {Icon} from '../components'
const styles:{[key:string]:CSS} = {
    area: {position:"fixed",top:0,left:0,height:"100%",zIndex:1},
    cont: {position:"fixed",top:"2%",left:0,zIndex:1,overflowX:"hidden",height:`96%`},
    icon: {position:"absolute",transform:`translate(-50%,-50%)`},
    item: {padding:"10px 10px 10px 32px",color:"#818181",display:"block",}
}
export const SidesArea :FC<Props> = ({spring, bind, size=1}) => (
    <a.div style={{...styles.area,
        width     : spring.x.to((x:number)=>x>1?"100%":`${size*50/2}px`),
        background: spring.scale.to((s:number)=>{
            const rate  = spring.x.animation.to/window.innerWidth //0 ~ 0.5
            return `linear-gradient(90deg,rgba(0,0,0,${rate+s-1}),rgba(0,0,0,0))`})
        }} {...bind()} />
)
export const SidesContainer : FC<Props> = ({size=1, spring, children}) => (
    <a.div style={{...styles.cont,
        width:spring.x.interpolate((x:number)=>x>0?x:0),
        borderRadius:`0px ${50*size}px ${50*size}px 0px`,
        backgroundColor:"#212121"}}>
        <div style={{margin:`${50*size}px 0px 0px 0px`, position:"absolute"}}>{children}</div>
    </a.div>
)
export const SidesIcon : FC<Props> = ({spring, bind, circ=false, size=1}) => (
    <a.div {...bind()} style={{...styles.icon,...spring,top:size*50,left:size*50}}>
        <Icon fa="align-left" {...{circ,size}} />
    </a.div>
)
export const SidesItem :FC<Props> = ({children, size=1}) => (
    <a.div style={{...styles.item,transition:"0.75s",fontSize:50*size}}
        onClick={(e:any)=>e.stopPropagation()}>{children}</a.div>
)
export type  Sides = FC<Partial<Props<{}>>>
export const Sides:Sides = ({children, width=window.innerWidth/2, size=1, onOpen=()=>null}={}) => {
    const opened = useRef<boolean>(false)
    const setOpened = useCallback((bool=true)=>1&&( (opened.current=bool), onOpen&&onOpen() ),[onOpen])
    const [spring, set] = useSpring( () => ({x:0,y:0,scale:1}) )
    const open =(v=0)=>1&&(setOpened(true),set({x:width,y:0,config:v!==0?config.wobbly:config.slow}))
    const close=(v=0)=>1&&(setOpened(false),set({x:0    ,y:0,config:{...config.stiff,velocity:v }}))
    const bind = useGesture({
        onHover : ({hovering}) => set({scale:hovering?1.2:1}),
        onDrag : ({last,down,vxvy:[vx,],movement:[mx,my],cancel}) => {
            if ((my<-width*.5||width*.5<my) && cancel) cancel()
            if (!last) return set({x:(opened.current?width:0)+(down?mx:0),y:down?my:0})
            if(!opened.current) return (mx===0||mx> width*0.5||vx> 0.5) ? open(vx) : close(vx)
            if( opened.current) return (mx===0||mx<-width*0.5||vx<-0.5) ? close(vx): open(vx)
        },
    })
    return (
        <div style={{position:"fixed", top:0,left:0,zIndex:100}}>
            <SidesIcon   {...{size, spring, bind, }} />
            <SidesArea     {...{size, spring, bind, }} />
            <SidesContainer{...{size, spring, bind, }}>
            <Trees {...{dark:true,size}}>
                {React.Children.map(children, ((child, key) =>
                    <SidesItem {...{size, key}}>{child}</SidesItem>
                ))}
            </Trees>
            </SidesContainer>
        </div>
    )
}
