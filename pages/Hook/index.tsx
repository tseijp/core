import React, {CSSProperties as CSS, useMemo, FC} from 'react';
import {useGrid}  from 'use-grid';
import {Controls} from 'react-three-gui';
import {Helmet}   from 'react-helmet-async';
import {hookPage,HookPage,pageConfig} from '../utils';
import {topUp,Card,Notes,Sides,Split,Trees,Trans} from '../../src'
import styled from 'styled-components'
import {usePage} from '@tsei/note'
import {Code} from '@tsei/mdmd'

const styles:{[key:string]:CSS} = {
    item: {position:"relative",height:"100vh",},
    card: {position:"relative",overflow:"hidden",width:"100%",height:"100%",},
    ctrl: {position:"relative",width:"100%",top:0,left:0,margin:0,padding:0},
}

const HookWrap = styled.div<any>`
    position: relative;
    transition: 1s;
    overflow-x: hidden;
    min-height: 100%;
    background: ${props => props.background}
`
const HookMain = (props: any) => <Split min={.1} style={styles.item} {...props}/>
const HookCard = (props: any) => <Card min={-1} style={styles.card} {...props} rate={.1}/>
const HookCtrl = ({title, background, color, size}: any) =>
    <Controls style={{background,...styles.ctrl, color,fontSize:size*25,x:0,y:0}}
        title={title}
        anchor='top_left'
        collapsed={true}/>


export const Hook:FC = () => {
    const [dark, setDark] = useGrid<number>({init:0, md:1, lg:0  })
    const [size, setSize] = useGrid<number>({init:0, md:1, lg:1.5})
    const [page, setPage] = usePage<HookPage>(hookPage, pageConfig)
    const [side, setSide] = useGrid<number>({xs:0,lg:89/233})
    const [ctrl, demo, code, trees] = useMemo(() => {
        const background = dark?"#212121":"#fff"
        const color = dark?"#818181":"#000"
        return [
            page.id   && <HookCtrl {...{background, color, size}} title={page.id}/>,
            page.Demo && <page.Demo />,
            page.code && <Code {...{dark,size,value:page.code}}/>,
            page.tree && <Trees  {...{dark,size:size/2,root:page.id?0:1}}>
                { page.tree.map((ids: any,i=0) =>
                    <span key={i}>{ ids.map((id: any, j=0) =>
                    <span key={id} onClick={() => j&&setPage({id})}>{id}</span>) }
                    </span>)}
                </Trees>
        ]
    }, [dark, page.Demo, page.code, page.id, page.tree, setPage, size])
    return (
        <HookWrap background={dark?"#000":"#fff"}>
            {  (page.hash==="#app" && page.Demo && <page.Demo/>)
             ||(page.hash==="#raw" && page.code && <>{page.code}</>)
             ||(
            <HookMain order={page.Demo? [side, -1]: [1, 0]}>
                <Notes {...{dark,size,space:"1rem"}}>
                    <HookCard {...{dark,size}}>{ctrl}</HookCard>
                    <HookCard {...{dark,size}}>{trees}</HookCard>
                </Notes>
                <Notes {...{dark,size,space:"1rem"}}>
                    <HookCard {...{dark,size}}>{demo}</HookCard>
                    <HookCard {...{dark,size}}>{code}</HookCard>
                </Notes>
            </HookMain>
            )}
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
        </HookWrap>
    )
}
