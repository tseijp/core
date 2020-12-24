import {useRef} from 'react';
import {useSpring, SpringValue, config, UseSpringProps} from 'react-spring'
import {useGesture} from 'react-use-gesture'
import {Props} from '../../types'


export function useTrans (props: Props<{
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
