import React, {FC} from 'react'
import * as THREE from 'three'
import {Canvas, } from 'react-three-fiber'
import {useControl as use} from 'react-three-gui';
import {TransformControls} from 'drei'
import {Kinect} from '../../meshs'

export const HookKinect :FC = () => {
    const depthTest = use('depthTest', {type:'boolean', value:false, })
    const depthWrite = use('depthWrite', {type:'boolean', value:false})
    const nearClipping = use('nearClipping', {type:'number', value:1000, min:0, max:2000})
    const farClipping = use('farClipping', {type:'number', value:4000, min:0, max:8000})
    const pointSize = use('pointSize', {type:'number', value:5, min:0, max:10, spring: true})
    const zOffset = use('zOffset', {type:'number', value:1000, min:0, max:2000})
    const space = use('space', {type:'number', value:5, min:0, max:10})
    const url = use('url', {type: "select", items: ["/static/core/kinect.mp4", ""]})
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
                <Kinect {...props}/>
            </TransformControls>
        </Canvas>
    )
}
export const codeKinect =
`
import {Kienct} from '@tsei/core'
import {Canvas} from 'react-three-fiber'
const MyCanvas = () =>
    <Canvas>
        <Kinect />
    </Canvas
`
