//import * as THREE from 'three'
import  React, {FC, //CSSProperties as CSS, FC, Children
        useRef,//useEffect, useState, useCallback, useLayoutEffect, Suspense,
} from 'react'
import {useSpring, animated as a} from 'react-spring/three'
import {useGesture} from 'react-use-gesture'
import {useFrame,useThree} from 'react-three-fiber'
import {Props} from '../types'

type Vec3<T=number> = [T, T, T]
export type Player = FC<Props<{
    distance:Vec3,
    position:Vec3,
    rotation:Vec3,
    onWalk:null|((p:Vec3)=>void), //TODO
}>>
export const Player:Player = ({
    children,
    //distance=[0,1,0],
    position=[0,0,0],
    rotation=[0,0,0],
}) => {
    const gRef = useRef(null)
    const pRef = useRef({position,rotation})
    const [player,setP] = useSpring(()=>pRef.current)
    const {gl:{domElement}} = useThree()
    const set =(dx=0,dy=0,dz=0)=> {
        pRef.current.position = [dx,dy,dz].map((v,i) => v/10+pRef.current.position[i]) as Vec3
        setP({...pRef.current})
    }
    useGesture({
        onDrag :({movement:[,y]}) => set(0, -10*y/window.innerHeight),
        onWheel:({movement:[,y]}) => set(0, -10*y/window.innerHeight)
    }, {domTarget:domElement, eventOptions:{passive:false}})
    useFrame(({camera}) => {
        const pos = player.position.get()
        camera.position.x = pos[0]
        camera.position.y = pos[1]
        camera.position.z = pos[2]
    })
    return (
        <a.group ref={gRef} {...player as any}>
            {children}
        </a.group>
    )
}
