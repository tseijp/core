import React, {FC, Suspense} from 'react'
import * as THREE from 'three'
import {Canvas, } from 'react-three-fiber'
import {useControl as _} from 'react-three-gui';
import {TransformControls} from '@react-three/drei'
import {
    Kinect as KinectTarget,
    Motion as MotionTarget
} from '../meshs'

export const Kinect :FC = () => {
    const depthTest = _('depthTest', {type:'boolean', value:false, })
    const depthWrite = _('depthWrite', {type:'boolean', value:false})
    const nearClipping = _('nearClipping', {type:'number', value:1000, min:0, max:2000})
    const farClipping = _('farClipping', {type:'number', value:4000, min:0, max:8000})
    const pointSize = _('pointSize', {type:'number', value:5, min:0, max:10, spring: true})
    const zOffset = _('zOffset', {type:'number', value:1000, min:0, max:2000})
    const space = _('space', {type:'number', value:5, min:0, max:10})
    const url = _('url', {type: "select", items: ["/static/core/kinect.mp4", ""]})
    const props = {
        nearClipping,
        farClipping,
        depthTest,
        depthWrite,
        pointSize,
        zOffset,
        space,
        url,
    }
    return (
        <Canvas gl={{antialias:false, logarithmicDepthBuffer: true}}
                style={{width:'100%',height:'calc(100vh - 2rem)'}}
                camera={{position:[0,0,500], far:2000}}
                pixelRatio={window.devicePixelRatio}
                onCreated ={({gl}:any) => {
                    gl.outputEncoding = THREE.sRGBEncoding
                    gl.toneMapping    = THREE.ACESFilmicToneMapping
                }}>
            <ambientLight intensity={1.1} />
            <pointLight position={[100, 100, 100]} intensity={2.2} />
            <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
            <gridHelper position={[0,-1000,0]} args={[2000,50]}/>
            <TransformControls>
                <KinectTarget {...props}/>
            </TransformControls>
        </Canvas>
    )
}
export const Motion :FC = () => {
    const dark = _('dark' , {type: 'boolean', value: false})
    const size = _('size' , {type: 'number' , distance:2, value: 1})
    const scl  = _('scale', {type: 'number' , distance:2, value: 1})
    const xz   = _('xz'   , {type: 'xypad'  , distance:2, value: {x:0,y:0}, scrub:true})
    const y    = _('y'    , {type: 'number' , distance:2, value: 0, min:-1})
    const rxz  = _('rxz'  , {type: 'xypad'  , distance:2, value: {x:0,y:0}, scrub:true})
    const ry   = _('ry'   , {type: 'number' , distance:2, value: 0, min:-1})
    const action= _('action'   , {type: 'number' , distance:10, value: 0})
    return (
        <Canvas gl={{antialias:false, logarithmicDepthBuffer:true}}
                style={{width:"100%", height:"calc(100vh - 2rem)"}}
                pixelRatio={window.devicePixelRatio}
                onCreated={({gl})=>{
                    gl.outputEncoding=THREE.sRGBEncoding
                }}>
            <hemisphereLight intensity={0.68} position={[0, 50, 0]} />
            <directionalLight position={[-8, 12, 8]} castShadow />
            <Suspense fallback={null}>
                <MotionTarget {...{
                    dark,size,action:~~action,
                    position:[ xz.x,  y,  xz.y],
                    rotation:[rxz.y, rxz.x,-ry],
                    scale   :[scl,scl,scl]}}/>
            </Suspense>
        </Canvas>
    )
}
