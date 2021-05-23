export const Pulls =
`import {Pulls} from '@tsei/core'
const App = () => (
    <Pulls
        dark={true}
        size={1}
        open={false}
        width={50}
        align="bottom">
        🤯
    </Pulls>
)`

export const Sides =
`import {Sides} from '@tsei/core'
const App = () =>
    <Sides dark={false} size={1}>
        <span>Home</span>
        <span>Hook</span>
        <span>Note</span>
    </Sides>
`

export const Trans =
`import {Trans} from '@tsei/core'
const App = () => {
    <Trans dark={false} size={1}>
        <div>{dark?'🌞':'🌛'}</div>
        <div>{dark?'👨':'👶'}</div>
        <div>{dark?'😆':'😃'}</div>
        <div>{dark?'👈':'🎴'}</div>
        <div>{dark?'👈':'🍖'}</div>
    </Trans>
}`
