import React, {ReactChild as RC, FC, CSSProperties as CSS, Children,useCallback,useEffect,useMemo,useState,useRef} from 'react'
import {useSprings, animated as a} from 'react-spring'
import {useGesture,} from 'react-use-gesture'
import {clamp, swap} from '../utils'
import {Props} from '../types'
const background = ({r=0,g=0,b=0,a=.1,debug=true}:any) => debug?{background:`rgba(${[r,g,b,a].join(',')})`}:{}
const styles:{[key:string]:CSS} = {
    cont: {position:"relative",width:"100%",zIndex:0,margin:`auto`},
    main: {position:"relative",width:"100%",zIndex:0,},
    side: {position:"absolute",top:0,left:0,right:0,margin:"auto"},
    btn : {position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)" },
}
export const NotesSide:FC<Props> = ({
    children,size=1,height=0,x, debug=false,
}) => x.interpolate((px:number)=>px**2<=0 ) ? null :
    <a.div children={children} style={{...styles.side, height, ...background({b:255,debug}),
        y:0,  x:x.to((px:number)=> -px+(px>0?-.5:.5)*(size*500)),
        scale  :x.to((px:number)=>px**2/4>size**2?1:(px>0?px:-px)/(size)),
        width  :x.to((px:number)=>px>0?px*2:-px*2),
        display:x.to((px:number)=>px?"inline":"none") } as any}/>

export const NotesItem:FC<Props> = (
    ({children,x}) => !children ? null :
        <a.div style={{...styles.btn,display:x.to((px:number)=>px<0?"inline":"none")} as any}>
            {children} </a.div>
)
export type Notes = FC<Props<{
    grandren:any,right:RC,left:RC, depth:number, space:number|string,
}>>
export const Notes:Notes = ({
    order=null, grandren=null, debug=false,
    right=null, left=null, depth=0, space=0,
    size=1, style={}, ...props
}) => {
    const [length, setLength] = useState<number>((props?.children as any)?.length||1)
    const [height, setHeight] = useState<number>(props.height || size*500*length)
    const [isOpen, setIsOpen] = useState<boolean[]>(Array(length).fill(false))
    const orderRef    = useRef<number[]>(order||[...Array(length)].map((_,i:number)=>i))
    const heightRef   = useRef( Array(length).fill(size*500) )
    const targetRef   = useRef<HTMLDivElement|null>(null)
    const setPosition = useCallback(() => {
        if (props.height) return setHeight(props.height)
        const childs  = Array.from(targetRef?.current?.children||[])
        heightRef.current = [...childs].map((c:any)=>c.clientHeight||0)
        props.children && setHeight([...heightRef.current,0].reduce((a,b)=>a+b) || size*500*length)
    }, [size, length, props.height, props.children])
    useEffect(()=>{
        const len = (props.children as any)?.length||1
        setLength(len)
        setIsOpen(Array(len).fill(false))
        if (orderRef.current.length === len) return
         orderRef.current = order||[...Array(len)].map((_,i:number)=>i)
        heightRef.current = Array(len).fill(size*500)
    }, [size, order, props.children])
    //  *************************  ➊ React Springs  *************************  //
    const getY = ({pre=0,arr=orderRef.current})=>pre<1?0:[...arr.slice(0,pre).map(i=>heightRef.current[i]),0].reduce((a,b)=>a+b)
    const getF = ({i=-1,x=0,s=1.0})=>(j=0)=>({x:j===i?x:0,y:getY({pre:orderRef.current.indexOf(j)}),scale:j===i?s:1})
    const getG = useCallback(({i=-1,arr=orderRef.current,pre=-1,mx=0,my=0,down=false}) =>
        (j:number) => (down&&j===i)
            ? {scale:0.9, x:mx, y:getY({pre})+my}
            : {scale:1.0, x:0 , y:getY({pre:arr.indexOf(j),arr})}, [])
    const [springs, set] = useSprings(length, getG({}))
    const bind = useGesture({
        onClick:()=>setTimeout(()=>{setPosition();set(getG({})) },1),
        onDrag : ({ down,cancel,movement:[mx,my],startTime,
                    last, args:[i], vxvy:[vx,vy],timeStamp, }) => {
            if(!last && cancel && timeStamp-startTime<1) cancel()
            const pre = orderRef.current.indexOf(i)
            const row = clamp( Math.round(pre+my/size*500), 0, length-1 )
            const arr = swap(orderRef.current, pre, row)
            if(!down) orderRef.current = arr
            if(!last) return set( getG({i,arr,pre,mx,my,down}) )
            const x = (mx<0?-1:1) * size*50// * 2 // window.innerWidth/2 -
            const op = (mx**2<.1||x**2<mx**2*2||vx**2+vy**2>1) ? !isOpen[i] : isOpen[i]
            setIsOpen(p=>[...Object.assign([],{[i]:!p[i]})])
            setTimeout(()=>{setPosition();set(getF({i,s:op?1:1}))},1)//TODO: s is .9?
        }
    })
    //  *************************  ➋ Child Render  *************************  //
    const children = useMemo(() => Children.map(props.children, (child) => {
        const grand = Children.toArray((child as any)?.props?.children) || []//count(child.props.children) || 0
        return (grand.length>1 && depth===0) // TODO for depth > 0
            ? React.cloneElement(child as any, {children:grand[0], grandren:(
                <Notes {...{...props, depth:depth+1,children:grand.slice(1)}}/> )})
            : child
    }), [depth, props])
    useEffect(()=>{
        const resize =()=> 1 && (setPosition(), set(getG({})))
        window.addEventListener('resize', resize); resize();
        return () => window.removeEventListener('resize', resize);
    }, [setPosition, set, getG] )
    return (
        <div ref={targetRef} style={{...styles.cont,height,...style, ...background({r:255,debug})} as any}>
            {springs.map( ({x,y,scale}, key) =>
                <a.div {...{key}} {...bind(key)} style={{x,y,position:"absolute",width:"100%"} as any}>
                    <a.div style={{...styles.main,scale,padding:space, ...background({g:255,debug})} as any}>
                        {(children as any)[key]}
                    </a.div>
                    <NotesSide {...{x,size,debug,height:heightRef.current[key]}}>
                        <NotesItem x={x}>{right}</NotesItem>
                        <NotesItem x={x}>{left}</NotesItem>
                    </NotesSide>
                    { isOpen[key] ? (children as any)[key]?.props?.grandren||'':'' }
                </a.div>
            )}
        </div>
    )
}
