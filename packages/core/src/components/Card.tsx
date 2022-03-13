/***Card
  *     Ref : https://codesandbox.io/embed/rj998k4vmm
  *           https://coliss.com/articles/build-websites/operation/css/
 ***/
import React, {useMemo} from 'react'
import {useGesture} from 'react-use-gesture'
import {useSpring, animated as a} from 'react-spring'
import styled from 'styled-components'

export function useCard (props: any, ref: any) {
    const { size=1, rate=1, style={}, ...other } = props
    const [{xyz}, set] = useSpring(()=>({xyz:[0,0,0]}))
    const calc = (x=0, y=0) => [
        (x - window.innerWidth  / 2) / size / 250, // -1 ~ 1
        (y - window.innerHeight / 2) / size / 250, // -1 ~ 1
        rate]
    const bind = useGesture({
        onDrag : ({event}) => event?.stopPropagation(),
        onMove : ({xy:[x,y]}) => set({xyz: calc(x, y)}),
        onHover: ({hovering}) => !hovering && set({xyz: [0,0,0]}),
    })
    const card = useMemo(() => {
        const boxShadow = xyz.to((x, y, z) => [
            `${1.5-y*2}rem`, // offset-y     : -0.5 ~ 1.5 ~ 3.5
            `${0.5-x*2}rem`, // offset-x     : -1.5 ~ 0.5 ~ 2.5
            `${1.5 + z}rem`, // blur-radius  : 1.5 =hover=> 2.5
            `${z - 0.5}rem`, // spread-radius:-0.5 =hover=> 0.5
            `hsl(200 50% 20% / ${15+z*5}%)`].join(' ')) as any
        const transform = xyz.to((x, y, z) => [
            `perspective(${size*50}px)`,
                `rotateX(${-y/10}deg)`, // -0.1 ~ 0.1
                `rotateY(${ x/10}deg)`, // -0.1 ~ 0.1
                  `scale(${1+z/10})`,].join(' ')) as any
        const zIndex = xyz.to((x,y,z) => x*y*z>0? 1: 0) as any
        return {boxShadow, transform, zIndex}
    }, [xyz, size])

    return {...other, ...bind(), ref, style: {...card, ...style}}
}

export const Card = styled(React.forwardRef((p, r) => <a.div {...useCard(p, r)}/>))
    .attrs<any>(_ => {
        const minHeight = _.min ?? _.size*500 ?? null
        const maxHeight = _.max ?? null
        return {minHeight, maxHeight}
    })<any>`
    margin: ${_ => _.space}px auto ${_ => _.space}px auto;
    padding: 0px;
    position: relative;
    width: min(80%, ${_ => _.size*500}px);
    border-radius: ${_ => _.size*25}px;
    overflow: hidden;
    ${_ => _.minHeight && `min-height: ${_.minHeight}px;`}
    ${_ => _.minHeight && `min-height: ${_.minHeight}px;`}
    background: ${_ => _.dark? "#212121": "#fff"};
    color: ${_ => _.color || _.dark? "#818181": "#000"}}
`
