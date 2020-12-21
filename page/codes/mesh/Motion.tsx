export const Motion =
`import {Motion} from '@tsei/core'
const App = () => (
    <Canvas {...{config}}>
        <Motion
            dark={false}
            size={1}
            position={[0,-1,0]}
            rotation={[0,.5,0]}
            scale   ={[1,1,1]}
            />
    </Canvas>
)
`
