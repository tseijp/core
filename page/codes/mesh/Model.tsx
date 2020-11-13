import React, {FC, Suspense, } from 'react'
import * as THREE from 'three'
import {Canvas} from "react-three-fiber"
import {useControl} from 'react-three-gui'
import {Model, Swarm} from "../../../src"
export const HookModel :FC = () => {
    const dark  = useControl('dark' , {type: 'boolean', value: false})
    const size  = useControl('size' , {type: 'number' , value: 1, min: 0, max:  2})
    const scl   = useControl('scale', {type: 'number' , value: 7, min: 0, max: 15})
    const pos   = useControl('position', {type:'xypad', value: {x:0,y:0}, scrub:true, distance:10})
    return (
        <Canvas gl={{antialias:false, logarithmicDepthBuffer:true}}
                style={{width:"100%", height:"calc(100vh - 2rem)"}}
                camera={{position:[0,-2,3]}}
                pixelRatio={window.devicePixelRatio}
                onCreated={({gl})=>{gl.outputEncoding=THREE.sRGBEncoding}}>
            <fog attach="fog" args={[0xdfdfdf, 35, 65]} />
            <hemisphereLight intensity={0.68} position={[0, 50, 0]} />
            <directionalLight position={[-8, 12, 8]} castShadow />
            <Suspense fallback={null}>
                <Model {...{dark,size,position:[pos.x,-11,pos.y],scale:[scl,scl,scl]}}/>
                <Swarm  {...{dark,size}}/>
            </Suspense>
        </Canvas>
    )
}
