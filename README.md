<h1 align="center">@tsei/core</h1>
<p align="center">🌌Fantastic <b>UI</b> in next tsei.jp</p>
<p align="center">
    <img alt="build passing" src="https://img.shields.io/badge/build-👌-green.svg"/>
    <img alt="types passing" src="https://img.shields.io/badge/types-👌-yellow.svg"/>
    <img alt="demos passing" src="https://img.shields.io/badge/demos-👌-red.svg"/>
    <br>
    <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/>
    <img alt="npm package" src="https://badge.fury.io/js/%40tsei%2Fcore.svg"/>
</p>

<hr>

# Table of Contents
- [Demo](#demo)  
- [Docs](#docs)
- [Install via npm](#install-via-npm)  
- [Available hook](#available-hook)  
- [Simple example](#simple-example)  

# Demo and Docs
- [home](https://tsei.jp/home/)
- [core](https://tsei.jp/hook/)
- [mdmd](https://tsei.jp/mdmd/)
- [note](https://tsei.jp/note/)
- [useGrid](https://tsei.jp/hook/use-grid/)
- ~[useUrei](https://tsei.jp/hook/use-urei/)~

# Install Via npm
- `npm i -S @tsei/core`

# Get Started
- `git clone https://github.com/tseijp/core`
- `cd core`, `npm i` and `npm start`
- open browser and visit [http://localhost:3000](http://localhost:3000)
- Now you can go to our [demo](https://tsei.jp/hook/), and try its usage.

#Available hook
hooks | what?  
:-----|:-----  
[useGrid](https://github.com/tseijp/use-grid) | build responsive layouts of all shapes and sizes
useNote | manage notes data and edit note
usePage | manage page transitions and restful api urls
useUser | basic function of account authentication using cookies

# Simple example
<p align="center">
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/containers/">
        <strong>CONTAINERS</strong></a>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/Card-black.svg"/></a>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Code.tsx">
        <img src="https://img.shields.io/badge/Code-black.svg"/></a>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Edit.tsx">
        <img src="https://img.shields.io/badge/Edit-black.svg"/></a>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Grow.tsx">
        <img src="https://img.shields.io/badge/Grow-black.svg"/></a>
</p>

```javascript
import React from 'react'
import { Split, Trees, Notes, Modal } from '@tsei/core'
const App = () =>
    <>
        <Split>
            <Trees>
                <>➊</>
                <>
                    <>➋</>
                    <>➋ - ➊</>
                    <>➋ - ➋</>
                </>
            </Trees>
            <Notes>
                <>➊</>
                <>
                    <>➋</>
                    <>➋ - ➊</>
                    <>➋ - ➋</>
                </>
            </Notes>
        </Split>
    </>
```

<hr>
<p align="center">
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/containers/">
        <strong>NAVIGATORS</strong></a>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Head.tsx">
        <img src="https://img.shields.io/badge/Head-black.svg"/></a>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Foot.tsx">
        <img src="https://img.shields.io/badge/Foot-black.svg"/></a>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Icon.tsx">
        <img src="https://img.shields.io/badge/Icon-black.svg"/></a>
</p>

```javascript
const App = () =>
    <>
        <Sides>
            <>Home</>
            <>Hook</>
            <>Note</>
        </Sides>
        <Trans>
            <>JA</>
            <>🌛</>
            <>👶</>
        </Trans>
        <Pills>
            <>
                <>o‍</>
                <>x</>
            </>
        </Pills>
        <Modal>
            <>🥰</>
            <>🌚</>
        </Modal>
    </>
```
