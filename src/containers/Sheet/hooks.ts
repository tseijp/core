import { useEffect, useCallback, useRef } from 'react'
import { useSpring, config, SpringValue } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import {Props} from '../../types'

export function useSheet (props: Props<{
    height: number,
    started: boolean,
    onOpen: (...args: any) => any,
    onClose: (...args: any) => any
}>): [{y: SpringValue<number>}, (...args: any) => any]
export function useSheet ({
    height=100,
    started=false,
    onOpen=null,
    onClose=null
}: any) {
    const [spring, set] = useSpring(() => ({ y:height }))
    const open  = useCallback((c=false)=> onOpen&&(onOpen() ,set({ y:0, config:c?config.wobbly:config.stiff }) ),[onOpen, set])
    const close = useCallback((v=0)=> onClose&&(onClose(),set({ y:height, config:{...config.stiff, velocity: v} }) ),[height, onClose, set])
    const bind  = useDrag(
        ({ last, vxvy:[,vy],movement:[mx,my], cancel }) => {
            if (my<-height/3) cancel&&cancel()
            if (last) return ( (my>height*0.5||vy>2.5) && (-100<mx&&mx<100) )? close(vy):open(vy>0)
            set({ y:my, immediate: false, config: config.stiff })
        }, { initial:()=>[0,spring.y.get()], filterTaps:true, bounds:{top:0}, rubberband:true }
    )
    const f = useRef((started:boolean)=>( started? open() : close()))
    useEffect(()=>{ f.current(started) }, [started])
    return [spring, bind]
}
