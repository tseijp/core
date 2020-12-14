import React, {CSSProperties as CSS, FC} from 'react';
import {useGrid}  from 'use-grid';
import {Controls} from 'react-three-gui';
import {Helmet}   from 'react-helmet-async';
import {hookTree,hookPage,HookPage,pageConfig} from './utils';
import {is,topUp,Card,Notes,Sides,Split,Trees,Trans} from '../src'
import {usePage} from '@tsei/note'
import {Code} from '@tsei/mdmd'

const styles:{[key:string]:CSS} = {
    top : {position:"relative",transition:"1s",overflowX:"hidden",minHeight:"100%",},
    item: {position:"relative",height:"100vh",},
    card: {position:"relative",overflow:"hidden",width:"100%",height:"100%",},
    ctrl: {position:"relative",width:"100%",top:0,left:0,margin:0,padding:0},
}
const CardHook:FC = (props) => <Card min={-1} style={styles.card} rate={.1} {...props}/>
export const Hook:FC = () => {
    const [dark, setDark] = useGrid<number>({init:0, md:1, lg:0  })
    const [size, setSize] = useGrid<number>({init:0, md:1, lg:1.5})
    const [page, setPage] = usePage<HookPage>(hookPage, pageConfig)
    const [side, setSide] = useGrid<number>({xs:0,lg:89/233})
    return (
    <div style={{...styles.top,background:dark?"#000":"#fff"}}>
        {   (page.hash==="#app"&&page.Hook&&<page.Hook/>)
        ||  (page.hash==="#raw"&&page.code&&<>{page.code}</>)
        ||  (
        <Split order={page.Hook?[side,-1]:[1,0]} min={.1} style={styles.item}>
            <Notes {...{dark,size,space:"1rem"}}>
                <CardHook {...{dark,size}}>{page.Hook &&
                    <Controls
                        title={topUp(page.id)} anchor='top_left'
                        style={{background:dark?"#212121":"#fff",...styles.ctrl,
                                color:dark?"#818181":"#000",fontSize:size*25,x:0,y:0}}
                        collapsed={true}/>}
                </CardHook>
                <CardHook {...{dark,size}}>
                    <Trees  {...{dark,size:size/2,root:page.id?0:1}}
                            {...(page.id?{fontSize:"14px"}:{})}
                            topStyle={{padding:page.Hook?25*size:100*size}}
                            content ={
                            <span onClick={() => setPage({id:""})}>Hook</span>}>
                        { hookTree.map((ids,i) => ids instanceof Array
                        ?   <span key={i}>{ ids.map((id, j) =>
                            <span key={id} onClick={() => j&&setPage({id})}>{id}</span>) }</span>
                        :   <span key={i}  onClick={() =>    setPage({id:ids})}>{ids}</span>) }
                    </Trees>
                </CardHook>
            </Notes>
            <Notes {...{dark,size,space:"1rem"}}>
                <CardHook {...{dark,size}}>
                    {page.Hook && <page.Hook />}
                </CardHook>
                { page.code && is.str(page.code) &&
                <CardHook {...{dark,size}}>
                    <Code {...{dark,size,value:page.code}}/>
                </CardHook>}
            </Notes>
        </Split>)}
        <Sides {...{size}}>
            <a style={{color:"#818181"}} href="/"    >Home</a>
            <a style={{color:"#818181"}} href="/hook">Hook</a>
            <a style={{color:"#818181"}} href="/note">Note</a>
        </Sides>
        <Trans {...{size}}>
            <div onClick={()=>setDark((p:any)=>({md:p.lg,lg:p.md}))}>{dark?'🌞':'🌛'}</div>
            <div onClick={()=>setSize((p:any)=>({md:p.lg,lg:p.md}))}>{size<75?'👨':'👶'}</div>
            <div onClick={()=>setSide((p:any)=>p.lg?{xs:0,sm:0,lg:0}:{xs:0,sm:250,lg:1/3})}>{side?'😆':'😃'}</div>
            <div onClick={()=>setPage(p=>({hash:p.hash!=="#app"?"#app":""}))}>{page.hash==="#app"?'👈':'🎴'}</div>
            <div onClick={()=>setPage(p=>({hash:p.hash!=="#raw"?"#raw":""}))}>{page.hash==="#raw"?'👈':'🍖'}</div>
        </Trans>
        <Helmet>
            <title>TSEI.jp {topUp(page.id)}</title>
            <link rel="canonical" href="https://tsei.jp/" />
        </Helmet>
    </div>
    )
}
