import React, {CSSProperties as CSS, FC, useState} from 'react'
//import { Card, Foot, Head } from '../src/components'
import { /*Modal, Pills, */Sides, Trans } from '../src/containers'
import { useGrid } from 'use-grid'
import { Canvas } from 'react-three-fiber'
import { Helmet } from 'react-helmet-async';
import {Render, Flow} from 'react-mol'
// import * as THREE from 'three'
// import {Provider} from 'jotai'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
const styles:{[key:string]:CSS} = {
    top: {position:"fixed",top:0,left:0,width:'100%',height:'100%'},
}
const {cos, sin, random} = Math
export const None :FC =  () => {
    const [lang, setLang] = useState<string>(window?.navigator?.language||'ja')
    const [dark, setDark] = useGrid<boolean>({md:true, lg:false})
    const [size, setSize] = useGrid<number> ({md:1    , lg:1.5 })
    return (
        <>
            <div style={{...styles.top, background:dark?"#000":"#fff"}}>
                <Canvas gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
                        camera={{ position:[0,0,500], far:2000 }}
                        pixelRatio={window.devicePixelRatio}>
                    <ambientLight intensity={1.1} />
                    <pointLight position={[100, 100, 100]} intensity={2.2} />
                    <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
                    <gridHelper position={[0,-1000,0]} args={[2000,50]}/>
                    <Render max={1000}>
                        <dodecahedronBufferGeometry args={[1,0]}/>
                        <meshStandardMaterial />
                        {Array(1000).fill(0).map((_,i) =>
                            <Flow key={i}
                                args={[...Array(4)].map(_ => random())}
                                position={(t=0,s=0,x=0,y=0,z=0) => [
                                    ((x-.5) - cos(t*s+x) - sin(t*s/1))*(x*100+50),
                                    ((y-.5) - sin(t*s+y) - cos(t*s/3))*(y*100+50),
                                    ((z-.5) - cos(t*s+z) - sin(t*s/5))*(z*100+50),
                                ]}
                                rotation={(t=0,s=0)=>Array(3).fill(cos(t*s)*size) as any}
                                scale={(t=0,s=0)=>Array(3).fill(cos(t*s/2)*size) as any}
                                color="black"/>
                        )}
                    </Render>
                </Canvas>
            </div>
            <Helmet>
                <title>404 NOT FOUND</title>
                <link rel="canonical" href="https://tsei.jp/" />
            </Helmet>
            <Sides {...{size}}>
                <a style={{color:"#818181"}} href="/"    >Home</a>
                <a style={{color:"#818181"}} href="/hook">Hook</a>
                <a style={{color:"#818181"}} href="/note">Note</a>
            </Sides>
            <Trans {...{size}}>
                <div onClick={()=>setLang(p=>p!=='ja'?'en':'ja')}>{lang.toUpperCase()}</div>
                <div onClick={()=>setDark((p:any)=>({md:p.lg,lg:p.md}))}>{dark?'🌞':'🌛'}</div>
                <div onClick={()=>setSize((p:any)=>({md:p.lg,lg:p.md}))}>{size<75?'👨':'👶'}</div>
            </Trans>
        </>
    )
}
