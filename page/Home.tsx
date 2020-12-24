import * as THREE from "three";
import React, {Suspense,useMemo,useRef} from "react";
import {Html} from "drei";
import {Canvas, useFrame} from "react-three-fiber";
import {useGrid} from 'use-grid'
import {Render, Flow, Vec3} from 'react-mol'
import {Sides,Trans,Grow,Pulls} from '../src'
import {Title} from './meshs'
import styled from 'styled-components'
const {sin, cos, random} = Math
const state = {x: 0, y: 0}

const Wrap = styled.div<any>`
    width: 100%;
    height: 100%;
    background: ${props => props.background};
`

function Page () {
    const vec = new THREE.Vector3();
    const group = useRef<THREE.Group>();
    useFrame(() => group.current?.position?.lerp(vec.set(state.x/100, state.y/100, 0), 0.1));
    return (
        <group ref={group}>
            <gridHelper position={[0,0,0]} args={[100,50]}/>
            <Title dark position={[0,0,3]}>TSEI.jp</Title>
            {useMemo(() => (
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
                            rotation={(t=0,s=0)=>Array(3).fill(cos(t*s)*5) as Vec3}
                            scale={(t=0,s=0)=>Array(3).fill(cos(t*s/2)*5) as Vec3}
                            color="black"/>
                    )}
                </Render>
            ), [])}
        </group>
    );
}

export function Home() {
    const [dark, setDark] = useGrid<number>({init:0, xs: 1, md:0, lg:1  })
    const [size, setSize] = useGrid<number>({init:0, xs:.5, md:1, lg:1.5})
    return (
        <Wrap background={dark?"#212121":"#fff"}>
            <Canvas pixelRatio={window.devicePixelRatio}
                    camera={{fov: 75, position: [0, 0, 5]}}
                    gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
                <ambientLight intensity={.3} />
                <pointLight position={[ 100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100,-100,-100]} intensity={5}/>
                <Suspense fallback={<Html center><Grow /></Html>}>
                    <Page/>
                </Suspense>
            </Canvas>
            <Pulls align="bottom" width={500}>
            </Pulls>
            <Sides {...{size}}>
                <a style={{color:"#818181"}} href="/"    >Home</a>
                <a style={{color:"#818181"}} href="/note">Note</a>
                <a style={{color:"#818181"}} href="/hook">Hook</a>
                <a style={{color:"#818181"}} href="/book">Book</a>
                <a style={{color:"#818181"}} href="/rmol">Rmol</a>
                <a style={{color:"#818181"}} href="/mdmd">Mdmd</a>
            </Sides>
            <Trans {...{size}}>
                <div onClick={()=>setDark((p:any)=>({md:p.lg,lg:p.md}))}>{dark?'🌞':'🌛'}</div>
                <div onClick={()=>setSize((p:any)=>({md:p.lg,lg:p.md}))}>{size<75?'👨':'👶'}</div>
            </Trans>
        </Wrap>
    );
}
