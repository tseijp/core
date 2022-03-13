import { useEffect, useCallback, useRef } from 'react'
import { animated, useSpring, config, SpringValue } from 'react-spring'
import styled from 'styled-components'
import { useDrag } from 'react-use-gesture'

export function useSheet (props: Partial<{
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

const Wrap = styled<any>(animated.div)`
    bottom: ${({height}) => `calc(-100vh + ${height-100}px)`};
    left: 2vw;
    width: 96vw;
    height: calc(100vh + 100px);
    z-index: 1;
    position: fixed;
    background: rgba(0,0,0,0);
    touch-action:  none;
    border-radius: 4em 4em 0px;
`

export function Sheet (props: {
    height: number,
    started: false,
    children:JSX.Element | string,
    onOpen: (...args: any) => any,
    onClose: (...args: any) => any,
}): JSX.Element

export function Sheet (props: any) {
    const [{y}, bind] = useSheet(props)
    const display = y.to((py=0) => (py < props.height?'block':'none'))
    return (
        <Wrap {...bind()} height={props.height} style={{y,display}}>
            {props.children}
        </Wrap>
    )
}
