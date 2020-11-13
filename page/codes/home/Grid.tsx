import React, {Suspense} from 'react'
import {Flex, Box} from 'react-three-flex'
import {Canvas} from 'react-three-fiber'
// import {useControl as use} from 'react-three-gui'
import {TransformControls} from 'drei'

const Helper = (props:any) => (
    <TransformControls>
        <mesh {...props}>
            <gridHelper rotation={[Math.PI/2,0,0]} scale={[.5,.5,.5]}/>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshPhongMaterial color={'orange'} />
        </mesh>
    </TransformControls>
)
export const HookGrid = () => {
    // const space = use('space', {type:'number', value:1, min:0, max:10})
    // const size = use('size', {type:'number', value:1, min:0, max:10})
    // const dark = use('dark', {type:'boolean', value:false})
    return (
        <Canvas
            style={{width:"100%",height:"100vh",margin:0,padding:0}}
            shadowMap concurrent noEvents colorManagement pixelRatio={2}>
            <ambientLight intensity={0.4} />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            <Suspense fallback={null}>
                <Flex dir="row" width="100vw" height="100%">
                    <Box width="50vw"><Helper /></Box>
                    <Box width="50vw"><Helper /></Box>
                </Flex>
            </Suspense>
        </Canvas>
    )
}
