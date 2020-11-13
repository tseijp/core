import React, {FC,useEffect,useMemo,useRef} from "react"
import {useFrame} from "react-three-fiber"
import {Props} from '../../src'
import * as THREE from "three"
type Vec3 = [number,number,number]
const vertexShader = `
uniform float size;
attribute float scale;
void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * scale * ( 300.0 / - mvPosition.z ) * 0.1;
    gl_Position = projectionMatrix * mvPosition;
}`

const fragmentShader = `
uniform vec3 color;
void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    gl_FragColor = vec4( color, 1.0 );
}`
type Point = FC<Props<{amp:number,dist:number,time:number,amount:{x:number,y:number}}>>
const Points:Point = ({
    amp=1,dist=5,time=1,amount={x:50,y:50,},
    color="", dark=false, size=1, style={}, ...props}) => {
    const geometry  = useRef<any>(null)
    const material  = useRef<any>(null)
    const uniforms = useMemo(() => ({
        color: {value:new THREE.Color(color||dark?0xffffff:0x000000)},
        size: {value: size}
    }), [color,dark,size])
    const delta = useRef(0)
    useEffect(() => {
        const scales    = new Float32Array(amount.x*amount.y)
        const positions = new Float32Array(amount.x*amount.y*3)
        var i = 0, j = 0;
        for ( var ix = 0; ix < amount.x; ix ++ ) {
            for ( var iy = 0; iy < amount.y; iy ++ ) {
                positions[ i ] = ix * dist - ( ( amount.x * dist ) / 2 ); // x
                positions[ i + 1 ] = 0; // y
                positions[ i + 2 ] = iy * dist - ( ( amount.y * dist ) / 2 ); // z
                scales[ j ] = 1;
                i += 3;
                j ++;
            }
        }
        geometry.current.setAttribute('scale'   ,new THREE.BufferAttribute(scales   , 1))
        geometry.current.setAttribute('position',new THREE.BufferAttribute(positions, 3))
    }, [dist, amount])
    useFrame (()=> {
        var i = 0, j = 0;
        geometry.current.attributes.scale.needsUpdate = true
        geometry.current.attributes.position.needsUpdate = true
        for ( var ix = 0; ix < amount.x; ix ++ ) {
            for ( var iy = 0; iy < amount.y; iy ++ ) {
                const t = delta.current// * time;
                geometry.current.attributes.position.array[i+1] = (Math.sin( (ix+t)*0.3 )*amp)  + (Math.sin( (iy+t)*0.5 )*amp);
                geometry.current.attributes.scale.array[j]   = (Math.sin( (ix+t)*0.3 )+ 1)*8 + (Math.sin( (iy+t)*0.5 )+ 1)*8;
                i += 3; j ++;
                delta.current += 0.0001 * time
            }
        }
        geometry.current.attributes.scale.needsUpdate = true
        geometry.current.attributes.position.needsUpdate = true
    })
    return (
        <points {...props}>
            <bufferGeometry ref={geometry} attach="geometry"/>
            <shaderMaterial ref={material} attach="material" args={[{uniforms,vertexShader,fragmentShader}]} />
        </points>
    )
}

const Plane = ({...props}) => {
    return (
        <mesh {...props} receiveShadow>
            <planeGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
            <meshLambertMaterial attach="material" color="#232323" transparent opacity={0.1} />
        </mesh>
    )
}

export type Stage = FC<Props<{
    position: Vec3,
    rotation: Vec3,
    scale   : Vec3,
}>>
export const Stage: Stage = ({
    position=[0, -11, 0],
    rotation=[0, 0, 0],
    scale=[0.1,0.1,0.1],
    ...props
}) => (
    <>
        <Points {...props} {...{position,rotation,scale}}/>
        <Plane  rotation={[-0.5*Math.PI, 0, 0]} position={[0, -11, 0]} />
    </>
)
