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

// const bind = (background="") => ({
//     style: {background},
//     onClick: () => console.log('HI')
// })
// export const Trees:FC = () => {
//     return (
//         <Head {...{dark:0,size:1}}>
//             <TREES content="Hook">
//                 <>
//                     <span {...bind("rgba(255,0,0,.1)")}>Components</span>
//                     <span {...bind("rgba(0,255,0,.1)")}>Card</span>
//                     <span {...bind("rgba(0,0,255,.1)")}>Modal</span>
//                 </>
//                 <span {...bind("rgba(0,0,0,.1)")}>_</span>
//             </TREES>
//         </Head>
//     )
// }
