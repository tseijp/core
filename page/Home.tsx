import * as THREE from "three";
import React, {Suspense,useRef,useState,useCallback} from "react";
import {Flex, Box} from "react-three-flex";
import {useAspect, Html} from "drei";
import {Canvas, useThree, useFrame} from "react-three-fiber";
import {Render} from 'react-mol'
import {useGrid} from 'use-grid'
import {
    Icon,
    Sides,
    Trans,
} from '../src'
import {Title} from './meshs'
// const Scroll = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     overflow: auto;
//     background: #212121;
//     `
const width  = "100%"
const height = "100%"
const state = {top: 0}
// const {sin} = Math
function Page ({ onChangePages, count:c=1000}:any) {
    const vec = new THREE.Vector3();
    const group = useRef<THREE.Group>();
    const {size} = useThree();
    const aspect = useAspect("cover", size.width, size.height, 2);
    const onReflow = useCallback((_,h=0) => onChangePages(h/aspect[1]),[onChangePages, aspect]);
    useFrame(() => group.current?.position?.lerp(vec.set(0, state.top/100, 0), 0.1));
    return (
        <group ref={group}>
            <Flex dir="column" size={[...aspect, 0] as any} {...{onReflow,width,height}}>
                <Render position={[-c/4,-1,-c/4]} max={2500}>
                    <sphereBufferGeometry attach="geometry" args={[1,32,32]}/>
                    <meshPhongMaterial    attach="material" />
                    {/*Array(c**2).fill(0).map((_,i) =>
                        <Flow key={i} color={"black"}
                            args={(t,x,_,z) => [sin((x+t)/3)+sin((z+t)/2)]}
                            position={r => [i%c,r,i/c%c]}
                            scale={r => [r/3,r/3,r/3]} />
                    )*/}
                </Render>
                <Box marginBottom={2}>
                    <Title dark>TSEI.jp</Title>
                </Box>
                <Box dir="column" {...{width, height}}>
                    <Box {...{width, height}}>
                        <Html center style={{width:"50vw", height, display:"flex", justifyContent: "space-evenly"}}>
                            <Icon fab="twitter"    onClick={()=>window.open('https://twitter.com/tseijp')}/>
                            <Icon fab="github"     onClick={()=>window.open('https://github.com/tseijp')} />
                            <Icon fab="soundcloud" onClick={()=>window.open('https://soundcloud.com/tsei')}/>
                        </Html>
                    </Box>
                </Box>
            </Flex>
        </group>
    );
}
export function Home() {
    const onScroll = (e:any) => (state.top = e.target.scrollTop);
    const [page, setPage] = useState(0);
    const [dark, setDark] = useGrid<number>({init:0, md:1, lg:0  })
    const [size, setSize] = useGrid<number>({init:0, md:1, lg:1.5})
    return (
        <div>
            <Canvas colorManagement shadowMap
                camera={{position:[0,0,2], zoom:1}}
                style={{position:"absolute", width:"100vw", height:"100vh"}}>
                <pointLight position={[0,1,4]} intensity={0.1} />
                <ambientLight intensity={0.2} />
                <spotLight castShadow position={[1,1,1]} penumbra={1}/>
                <Suspense fallback={<Html center>loading..</Html>}>
                    <Page onChangePages={setPage} dark={dark}/>
                </Suspense>
            </Canvas>
            <div onScroll={onScroll} style={{position: "absolute",top: 0,left: 0,width: "100vw",height: "100vh",overflow: "auto",}}>
                <div style={{ height: `${page * 100}vh` }} />
            </div>
            <Sides {...{size}}>
                <a style={{color:"#818181"}} href="/"    >Home</a>
                <a style={{color:"#818181"}} href="/hook">Hook</a>
                <a style={{color:"#818181"}} href="/note">Note</a>
            </Sides>
            <Trans {...{size}}>
                <div onClick={()=>setDark((p:any)=>({md:p.lg,lg:p.md}))}>{dark?'🌞':'🌛'}</div>
                <div onClick={()=>setSize((p:any)=>({md:p.lg,lg:p.md}))}>{size<75?'👨':'👶'}</div>
            </Trans>
        </div>
    );
}
