import React, {FC, Suspense, } from 'react'
import * as THREE from 'three'
import {Canvas} from "react-three-fiber"
import {useControl as use} from 'react-three-gui'
import {Motion} from '../../meshs'
export const HookMotion :FC = () => {
    const dark = use('dark' , {type: 'boolean', value: false})
    const size = use('size' , {type: 'number' , distance:2, value: 1})
    const scl  = use('scale', {type: 'number' , distance:2, value: 1})
    const xz   = use('xz'   , {type: 'xypad'  , distance:2, value: {x:0,y:0}, scrub:true})
    const y    = use('y'    , {type: 'number' , distance:2, value: 0, min:-1})
    const rxz  = use('rxz'  , {type: 'xypad'  , distance:2, value: {x:0,y:0}, scrub:true})
    const ry   = use('ry'   , {type: 'number' , distance:2, value: 0, min:-1})
    const action= use('action'   , {type: 'number' , distance:10, value: 0})
    return (
        <Canvas gl={{antialias:false, logarithmicDepthBuffer:true}}
                style={{width:"100%", height:"calc(100vh - 2rem)"}}
                pixelRatio={window.devicePixelRatio}
                onCreated={({gl})=>{
                    gl.outputEncoding=THREE.sRGBEncoding
                }}>
            {/*<fog attach="fog" args={[0xdfdfdf, 35, 65]} />*/}
            <hemisphereLight intensity={0.68} position={[0, 50, 0]} />
            <directionalLight position={[-8, 12, 8]} castShadow />
            <Suspense fallback={null}>
                <Motion {...{
                    dark,size,action:~~action,
                    position:[ xz.x,  y,  xz.y],
                    rotation:[rxz.y, rxz.x,-ry],
                    scale   :[scl,scl,scl]}}/>
            </Suspense>
        </Canvas>
    )
}
export const codeMotion =
`import {Motion} from '@tsei/core'
const App = () => (
    <Canvas {...{config}}>
        <Motion
            dark={false}
            size={1}
            position={[0,-1,0]}
            rotation={[0,.5,0]}
            scale   ={[1,1,1]}
            />
    </Canvas>
)
`
