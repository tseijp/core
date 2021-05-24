import React, {Children} from 'react'
import styled from 'styled-components'

const Wrap = styled.div<any>`
    position: relative;
    left: 0;
    bottom: 0;
    height: auto;
    background: #212121;
    min-width: 100%;
    borderRadius: ${({size=1}) => `${size*25}px ${size*25}px 0px 0px`};
    padding     : ${({size=1}) => `0px ${size*50}px ${size*25}px ${size*50}px`}
`
const Item = styled.div<any>`
    position: relative;
    text-align: center;
    fontSize: ${({size}) => `${~~(size*50)}px`}
`

export const Foot = React.forwardRef(({
    children, size=1, style={}, ...props
}: any, ref) => {
    return (
        <Wrap {...props} {...{ref, style}}>
            {Children.map(children, child =>
                <Item>{child}</Item>
            )}
        </Wrap>
    )
}
)
