import {MidiKey} from '../types'
import {Controller} from '../Controller'

export interface State {
}

export interface Engine <Key extends MidiKey> {
    init?(): void
    reset?(): void
    setup?(): void
    intent?(): void
}

export abstract class Engine <Key extends MidiKey> {
    ctrl: Controller
    args: any[]
    readonly key: Key
    constructor (ctrl: Controller, args: any[], key: Key) {
        this.ctrl = ctrl
        this.args = args
        this.key = key
        if (!this.state) {
            this.state = {
                values: [0, 0],
                initial: [0, 0]
            } as any
            if (this.init) this.init()
            if (this.reset) this.reset()
       }
    }

    get state () {
        return this.ctrl.state[this.key]!
    }

    set state(state) {
        this.ctrl.state[this.key] = state
    }

    get config () {
        return this.ctrl.config
    }

    get handler () {
        return this.ctrl.handlers[this.key]!
    }

    start (event: any) {
        const {state} = this
        state.startTime = state.timeStamp = event.timeStamp
    }
}
