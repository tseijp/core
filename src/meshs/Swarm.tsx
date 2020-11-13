import React, {useCallback, useMemo, useRef} from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'

export const Swarm = ({ dark=false, size=50, count=25}:any) => {
    const mesh = useRef<any>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const random = useCallback((mul=1,add=0)=>add+Math.random()*mul, [])
    const particles = useMemo(() => [...Array(count)].map(()=>({
        t     :random(100),       xFactor:random(40,-20), mx:0,
        factor:random(100,2),     yFactor:random(40,-20), my:0,
        speed :random(1/200,0.01),zFactor:random(40,-20),})), [random,count])
    useFrame(() => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.max(1.5, Math.cos(t) * size / 10)
            dummy.position.set(
                (particle.mx/10)*a + xFactor + Math.cos((t/10)*factor) + (Math.sin(t*1)*factor)/10,
                (particle.my/10)*b + yFactor + Math.sin((t/10)*factor) + (Math.cos(t*2)*factor)/10,
                (particle.my/10)*b + zFactor + Math.cos((t/10)*factor) + (Math.sin(t*3)*factor)/10,
            )
            dummy.scale.set(s, s, s)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            <instancedMesh ref={mesh} args={[null,null,count] as [any,any,number]}>
                <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
                <meshPhongMaterial attach="material" color={dark?0x000000:0xffffff} />
            </instancedMesh>
        </>
    )
}
