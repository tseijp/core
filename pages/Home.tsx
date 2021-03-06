import React, {Suspense,useMemo,useRef} from 'react';
import styled from 'styled-components';
import {Group} from 'three';
import {useMove} from 'react-use-gesture';
import * as THREE from 'three';
import {useReflow} from "react-three-flex";
import {Text, Html} from '@react-three/drei';
import {Canvas, useFrame} from 'react-three-fiber';
import {useGrid} from 'use-grid';
import {Sides, Trans} from '../src';
import {Instanced, Flow, Vec3} from 'react-mol';
const {sin, cos, random} = Math
const state = {x: 0, y: 0}

export function Title ({
    anchorX="center", anchorY="middle", textAlign="center", href="",
    dark=false, size=1, space=0, maxWidth=-1, children, ...props
}: any) {
    const color = props.color || dark? "#fff": "#000"
    const reflow = useReflow()
    const onClick = href? undefined: () => window.open(href)
    return (
        <Text
            onSync={reflow}
            fontSize={size/2}
            lineHeight={size/2}
            letterSpacing={space}
            {...props as any}
            {...{color, anchorX, anchorY, textAlign, maxWidth, onClick}}>
            {typeof children==="string"? children: (children as any)?.props?.children||''}
            <meshStandardMaterial />
        </Text>
    )
}

const Wrap = styled.div<any>`
    width: 100%;
    height: 100%;
    position: relative;
    background: ${props => props.background};
`

function Page () {
    const vec = new THREE.Vector3();
    const move = useRef({x: 0, y: 0})
    const group = useRef<Group>(null)
    useMove(({xy: [x, y]}) => {move.current = {x, y}}, {domTarget: window})
    useFrame(({camera, scene, size}) => {
        const dx =-(move.current.x - .5 * size.width) / 500 - camera.position.x
        const dy = (move.current.y - .5 * size.height) / 500 - camera.position.y
        camera.position.x += dx * 0.05
        camera.position.y += dy * 0.05
        camera.lookAt(scene.position)
        group.current?.position.lerp(vec.set(state.x/100, state.y/100, 0), 0.1)
    });
    return (
        <group ref={group}>
            <gridHelper position={[0,0,0]} args={[100,50]}/>
            <Title dark position={[0,0,3]}>TSEI.jp</Title>
            {useMemo(() => (
                <Instanced>
                    <dodecahedronBufferGeometry args={[1,0]}/>
                    <meshStandardMaterial />
                    {[...Array(1000).keys()].map(i =>
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
                </Instanced>
            ), [])}
        </group>
    );
}

export function Home({gl={alpha: true, antialias: false, logarithmicDepthBuffer: true}}) {
    const [dark, setDark] = useGrid<number>({init:0, md:0, lg:1  })
    const [size, setSize] = useGrid<number>({init:0, md:1, lg:1.5})
    return (
        <Wrap background={dark?"#212121":"#fff"}>
            <Canvas camera={{fov: 75, position: [0, 0, 5]}}
                gl={gl}>
                <ambientLight intensity={.3} />
                <pointLight position={[ 100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100,-100,-100]} intensity={5}/>
                <Suspense fallback={<Html center>Loading...</Html>}>
                    <Page/>
                </Suspense>
            </Canvas>
            <Sides {...{size}}>
                <a style={{color:"#818181"}} href="/"    >Home</a>
                <a style={{color:"#818181"}} href="/hook">Hook</a>
                <a style={{color:"#818181"}} href="/note">Note</a>
                <a style={{color:"#818181"}} href="/book">Book</a>
                <a style={{color:"#818181"}} href="/rmol">Rmol</a>
                <a style={{color:"#818181"}} href="/mdmd">Mdmd</a>
            </Sides>
            <Trans {...{size}}>
                <div onClick={()=>setDark((p:any)=>({md:p.lg,lg:p.md}))}>
                    {dark? '🌞':'🌛'}
                </div>
                <div onClick={()=>setSize((p:any)=>({md:p.lg,lg:p.md}))}>
                    {size<75? '👨':'👶'}
                </div>
            </Trans>
        </Wrap>
    );
}
