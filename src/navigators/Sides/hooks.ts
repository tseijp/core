import {useRef} from 'react';
import {useSpring, SpringValue, config} from 'react-spring'
import {useGesture} from 'react-use-gesture'

export type SidesProps = Partial<{
    fa: string,
    width: number,
    onOpen: (...args: any[]) => any,
}>

export function useSides (props: SidesProps): [{
    x: SpringValue<number>,
    y: SpringValue<number>,
    s: SpringValue<number>
}, (...args: any[]) => any]

export function useSides ({
    width=window.innerWidth/2, onOpen=()=>null
}: any) {
    const opened = useRef<number>(0)
    const [spring, set] = useSpring(() => ({x:0,y:0,s:1}))
    const run  =(o=1)=>1&&( (opened.current=o), onOpen&&onOpen() )
    const open =(v=0)=>1&&(run(1),set({x:width,y:0,config:v!==0?config.wobbly:config.slow}))
    const close=(v=0)=>1&&(run(0),set({x:0   ,y:0,config:{...config.stiff,velocity:v }}))
    const bind = useGesture({
        onHover : ({hovering}) => set({s:hovering?1.2:1}),
        onDrag : ({last,down,vxvy:[vx,],movement:[mx,my],cancel}) => {
            if ((my<-width*.5||width*.5<my) && cancel) cancel()
            if (!last) return set({x:(opened.current?width:0)+(down?mx:0),y:down?my:0})
            if(!opened.current) return (mx===0||mx> width*0.5||vx> 0.5) ? open(vx) : close(vx)
            if( opened.current) return (mx===0||mx<-width*0.5||vx<-0.5) ? close(vx): open(vx)
        },
    })
    return [spring, bind]
}
