import React, {CSSProperties as CSS,FC,useEffect,useCallback,useMemo} from 'react';
import {useSpring, animated as a} from 'react-spring';
import {useGesture} from 'react-use-gesture';
import {createPortal} from 'react-dom';
import {Props} from '../types';
export type Modal = FC<Props<{open:boolean}>>
export const Modal:Modal = ({
        open=false, onClose=null, dark=false, size=1, //onOpen=null,
        children, color="", ...props
    }) => {
    const width = useMemo(()=>500 * size,[size])
    const [spring, set] = useSpring(()=>({x:0,y:-width,scale:0}))
    useEffect(()=>{open&&set({x:0,y:0,scale:1})}, [open, set])
    const close=useCallback( (vx=0,vy=0) => {
        set({x:vx*width, y:(vy-1)*width, scale:0})
        onClose && setTimeout(()=>onClose(), vx**2+vy**2)
    }, [onClose, width, set] )
    const bind = useGesture({
        onHover : ({hovering}) => set({scale:hovering?0.9:1}),
        onDrag : ({last,down,vxvy:[vx,vy],movement:[mx,my],cancel}) => {
            if ((my<-width*.5||width*.5<my) && cancel) cancel()
            if (!last) return set({x:down?mx:0,y:down?my:0})
            return (mx**2>width**2/4||vx**2+vy**2>10)
                ? close(vx,vy)
                : set({x:0,y:0,scale:1})
        },
    })
    const root = useMemo<HTMLElement|null>(()=>document.getElementById('root'),[])
    const style = useMemo<CSS>(()=>({
        left:0, width:"100%",  display:"flex",justifyContent:"center",
        top:0, height:"100%", position:"fixed",   alignItems:"center",
        transition:"1s", color:color||dark?"#212121":"#000",
        zIndex:200,background:`rgba(${dark?"80,80,80":"0,0,0"},.5)`, ...props.style
    }), [dark, color, props.style])
    return open ? createPortal(
        <div style={style} onClick={()=>onClose&&onClose()}>
            <a.div style={{position:"relative",...spring}} {...bind()}
                onClick={e=>e.stopPropagation()}>
                {children}
            </a.div>
        </div>
    , root as HTMLElement) : null
}
