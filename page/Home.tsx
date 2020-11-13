import * as THREE from "three";
import React, {Suspense,useRef,useState,useCallback} from "react";
import {Flex, Box} from "react-three-flex";
import {useAspect, Html} from "drei";
import {Canvas, useThree, useFrame} from "react-three-fiber";
import {useGrid} from 'use-grid'
import {
    Icon,
    Title, Stage,
    Sides, Trans,
} from '../src'
const styles: {[key:string]: React.CSSProperties} = {
    scroll:{position: "absolute",top: 0,left: 0,width: "100vw",height: "100vh",overflow: "auto",},
    html: {display:"flex", justifyContent: "space-evenly"},
}
const width  = "100%"
const height = "100%"
const state = {
    top: 0
};
function Page ({ onChangePages }:any) {
    const vec = new THREE.Vector3();
    const group = useRef<THREE.Group>();
    const {size} = useThree();
    const aspect = useAspect("cover", size.width, size.height, 2);
    const onReflow = useCallback((_,h=0) => onChangePages(h/aspect[1]),[onChangePages, aspect]);
    useFrame(() => group.current?.position?.lerp(vec.set(0, state.top/100, 0), 0.1));
    return (
        <group ref={group}>
            <Stage position={[0,-1,-10]} size={.1} dark={true}/>
            <Flex dir="column" size={[...aspect, 0] as any} {...{onReflow,width,height}}>
                <Box marginBottom={2}><Title dark>TSEI.jp</Title></Box>
                <Box dir="column" {...{width, height}}>
                    <Box {...{width, height}}>
                        <Html center style={{width:"50vw", height, ...styles.html}}>
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
                gl={{ alpha: false }}
                camera={{position:[0,0,2], zoom:1}}
                style={{position:"absolute", width:"100vw", height:"100vh"}}>
                <pointLight position={[0,1,4]} intensity={0.1} />
                <ambientLight intensity={0.2} />
                <spotLight castShadow position={[1,1,1]} penumbra={1}/>
                <Suspense fallback={<Html center>loading..</Html>}>
                    <Page onChangePages={setPage} />
                </Suspense>
            </Canvas>
            <div onScroll={onScroll} style={styles.scroll}>
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
