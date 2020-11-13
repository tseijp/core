import React, {FC, Suspense} from 'react'
import {Flex, Box} from 'react-three-flex'
import {Canvas, useThree} from 'react-three-fiber'
import {useControl as use} from 'react-three-gui'
import {useAspect, TransformControls} from 'drei'
import {Title} from '../../../src'

const items = ["TSEIJP", "TEST\nTEST\nTEST"]
const ANCHORX = ["center", "left", "right"]
const ANCHORY = ["middle", "top", "top-baseline", "bottom-baseline", "bottom"]
const TEXTALIGN  = ["center", "left", "right", "justify"]
const Content:FC = (props) => {
    const {size} = useThree();
    const aspect = useAspect("cover", size.width, size.height, 2);
    return (
        <Flex dir="column" size={[...aspect, 0] as any}  width="100%" height="100%">
            <Box width="100%" height="100%">
                <Title {...props}/>
            </Box>
        </Flex>
    )
}
export const HookTitle:FC = () => {
    const anchorX   = use('anchorX'   , {type:"select", value:  ANCHORX[0], items: ANCHORX})
    const anchorY   = use('anchorY'   , {type:"select", value:  ANCHORY[0], items: ANCHORY})
    const textAlign = use('textAllign', {type:"select", value:TEXTALIGN[0], items: TEXTALIGN})
    const children  = use('children'  , {type:"select", value:items[0], items})
    const maxWidth = use('maxWidth', {type:'number', value:-1, min:-2, max:2})
    const space = use('space', {type:'number', value:1, min:0, max:10})
    const size = use('size', {type:'number', value:1, min:0, max:10})
    const dark = use('dark', {type:'boolean', value:false})
    return (
        <Canvas
            style={{width:"100%",height:"100vh",margin:0,padding:0}}
            shadowMap concurrent pixelRatio={2}
            noEvents colorManagement
            camera={{position:[0,0,2],far:1000}}
            gl={{powerPreference:'high-performance', alpha:true, antialias:false, stencil:false, depth:false}}
            onCreated={({gl}) => gl.setClearColor('#f5f5f5')}>
            <pointLight position={[-10, -10, -10]} intensity={1} />
            <ambientLight intensity={0.4} />
            <spotLight  castShadow angle={0.3} penumbra ={1} shadow-mapSize-width ={1024}
                        position={[0, 10, 20]} intensity={5} shadow-mapSize-height={1024} />
            <gridHelper position={[0,-.1,1]} scale={[.2,.2,.2]}/>
            <Suspense fallback={null}>
                <TransformControls>
                    <Content {...{
                        children,
                        anchorX,
                        anchorY,
                        textAlign,
                        dark,
                        size,
                        space,
                        maxWidth}}/>
                </TransformControls>
            </Suspense>
        </Canvas>
    )
}
export const codeTitle =
`import {Title} from '@tsei/core'
const App = () =>
    <Title
        anchorX="center"
        anchorY="center"
        textAlign="center"
        maxWidth={-1}
        space={[1,1]}
        size={1}
        dark={false}>
        TSEIJP
    </Title>`
