import React from 'react'
import {useControl as use} from 'react-three-gui';
import {Stage,Player} from '../../../src'
import * as THREE from 'three'
import {Canvas} from 'react-three-fiber'

export const HookPlayer = () => {
    const dark   = use('dark'  , {type: 'boolean', value: false})
    const size   = use('size'  , {type: 'number', min: 0, value: 1, max:2})
    // const time   = use('time'  , {type: 'number', min: 0, value: 1, max:2})
    // const pos    = use('amount', {type: "xypad" , value: {x:50,y:50} ,scrub:true})
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
                <Stage {...{dark,size}}/>
                <Player position={[0,5,0]} rotation={[-Math.PI/2,0,0]}>
                    <axesHelper />
                </Player>
            </Canvas>
    )
}
export const codePlayer =
`import {Stage} from '@tsei/core'
export const App = () => (
    <Canvas>
        <Stage
            dark={false}
            size={1}/>
    </Canvas>
)
`
