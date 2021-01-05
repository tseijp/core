import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import { Canvas, useFrame } from 'react-three-fiber'
import { useMove } from 'react-use-gesture'
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three'
import {Kinect} from './meshs'
import { useGrid } from 'use-grid'
import { Sides, Trans} from '../src'
//import { Card, Foot, Head } from '../src/components'
// import {Provider} from 'jotai'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
const Wrap = styled.div<any>`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: ${props => props.background}
`
const state = {x: 0, y: 0}
function Group ({children}: any) {
    const vec = new THREE.Vector3();
    const ref = useRef<THREE.Group>(null)
    const move = useRef({x: 0, y: 0})
    useMove(({xy: [x, y]}) => {move.current = {x, y}}, {domTarget: window})
    useFrame(({camera, scene, size}) => {
        const dx =-(move.current.x - .5 * size.width) / 5 - camera.position.x
        const dy = (move.current.y - .5 * size.height) / 5 - camera.position.y
        camera.position.x += dx * 0.05
        camera.position.y += dy * 0.05
        camera.lookAt(scene.position)
        ref.current?.position.lerp(vec.set(state.x/100, state.y/100, 0), 0.1)
    });
    return <group ref={ref} children={children}/>
}
export function None () {
    const [lang, setLang] = useState<string>(window?.navigator?.language||'ja')
    const [dark, setDark] = useGrid<boolean>({md:true, lg:false})
    const [size, setSize] = useGrid<number> ({md:1    , lg:1.5 })
    return (
        <>
            <Wrap background={dark?"#000":"#fff"}>
                <Canvas gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
                        camera={{ position:[0,0,100], far:2000 }}
                        pixelRatio={window.devicePixelRatio}>
                    <ambientLight intensity={1.1} />
                    <pointLight position={[100, 100, 100]} intensity={2.2} />
                    <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
                    <gridHelper position={[0,-1000,0]} args={[2000,50]}/>
                    <Group>
                        <Kinect url="/data/kinect.mp4"/>
                    </Group>
                </Canvas>
            </Wrap>
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
