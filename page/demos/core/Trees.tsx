import React, {FC} from 'react'
import {useControl} from 'react-three-gui';
import {Trees as Target, Head} from '../../../src'
const items = ['0', '1', '2', '3']

export const Trees:FC = () => {
    const dark     = useControl('dark'     , {type: 'boolean', value: false})
    const open     = useControl('open'     , {type: 'boolean', value: true })
    const immediate= useControl('immediate', {type: 'boolean', value: true })
    const visible  = useControl('visible'  , {type: 'boolean', value: true })
    const depth    = useControl('depth'    , {type: 'number' , value: 0, min: 0, max: 2})
    const root     = useControl('root'     , {type: 'number' , value: 1, min: 0, max: 2})
    const size     = useControl('size'     , {type: 'number' , value: 1, min: 0, max: 2})
    const icon     = useControl('icon'     , {type: 'select' , value: 'Close' , items:['Minus','Plus','Close']})
    const content  = useControl('content'  , {type: 'select' , value: items[0], items})
    return (
        <Head {...{dark,size}}>
            <Target {...{dark,open,visible,immediate,depth,root,size,icon,content}}>
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
            </Target>
        </Head>
    )
}
