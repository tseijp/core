export const Notes =
`import {Notes} from '@tsei/core'
const App =()=> (
    <Notes
        dark={true}
        size={1}>
        <div style={{height:size*100,background:"rgba(255,0,0,0,1)"}}>1</div>
        <div style={{height:size*100,background:"rgba(0,0,255,0,1)"}}>2</div>
        <div style={{height:size*100,background:"rgba(0,0,255,0,1)"}}>3</div>
    </Notes>
)`

export const Split =
`import {Split} from '@tsei/core'
export const Split = (
        <Target
            dark  = {false}
            size  = {1}
            min   = {0}
            width = {0}
            height= {0}>
            <div style={{width:"100%",height:"100%",background:"rgba(255,0,0,.1)"}}/>
            <div style={{width:"100%",height:"100%",background:"rgba(0,255,0,.1)"}}/>
            <div style={{width:"100%",height:"100%",background:"rgba(0,0,255,.1)"}}/>
        </Target>
)`

export const Trees =
`import {Trees} from '@tsei/core'
const App = () => (
    <Trees
        dark = {false}
        open = {true}
        immediate = {true}
        visible = {true}
        depth = {0}
        root = {1}
        size = {1}
        icon = {"Close"}
        content={"0"}>
        <>
            <>1</>
            <>1 - 1</>
            <>1 - 2</>
        </>
        <>
            <>2</>
            <>2 - 1</>
            <>2 - 2</>
        </>
    </Trees>
)
`
