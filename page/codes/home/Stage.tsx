import React from 'react'
import {useControl as use} from 'react-three-gui';
import {Stage} from '../../../src'
import * as THREE from 'three'
import {Canvas, } from 'react-three-fiber'
import {TransformControls} from 'drei'

export const HookStage = () => {
    const dark   = use('dark'  , {type: 'boolean', value: false})
    const size   = use('size'  , {type: 'number', min: 0, value: 1, max:2})
    const amp    = use('amp'   , {type: 'number', min: 1, value: 1, max:5})
    const dist   = use('dist'  , {type: 'number', min: 1, value: 5, max:10})
    const time   = use('time'  , {type: 'number', min: 0, value: 1, max:2})
    const amount = use('amount', {type: "xypad" , value: {x:50,y:50} ,scrub:true})
    // const scale  = use('scale' , {type: 'number', min:  0, value:.1   , max:2})
    // const posY   = use('posY'  , {type: 'number', min:-25, value: 0   , max:25})
    // const posXZ  = use('posXY' , {type: 'xypad' , value: {x:0,y:0}   ,scrub:true})
    return (
            <Canvas gl={{antialias:false, logarithmicDepthBuffer: true}}
                    style={{width:'100%',height:'calc(100vh - 2rem)'}}
                    camera={{position:[0,5,0], far:2000}}
                    pixelRatio={window.devicePixelRatio}
                    onCreated ={({gl}:any) => {
                        gl.outputEncoding = THREE.sRGBEncoding
                        gl.toneMapping    = THREE.ACESFilmicToneMapping
                    }}>
                <ambientLight intensity={1.1} />
                <pointLight position={[100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
                <TransformControls>
                    <Stage {...{
                        dark,size,amp,dist,time,amount}}/>
                </TransformControls>
            </Canvas>
    )
}
export const codeStage =
`import {Stage} from '@tsei/core'
export const App = () => (
    <Canvas>
        <Stage
            dark={false}
            size={1}/>
    </Canvas>
)
`
