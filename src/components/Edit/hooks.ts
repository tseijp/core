import { useSpring, SpringValue } from 'react-spring'
import { useGesture } from 'react-use-gesture'

export function useEdit (props: {

}): [{x: SpringValue<number>}, (...args: any) => any]

export function useEdit () {
    const [spring, ] = useSpring(() => ({x: 0}))
    const bind = useGesture({})
    return [spring, bind]
}
