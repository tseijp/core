export interface Controller {
    state: any
    config: any
    handlers: any
}

function setupMidi (ctrl: Controller, key: string) {
    ctrl.midi.add(key)
    // this.midiEventStores[key] = new EventStore(ctrl)
}
export class Controller {
    midi = new Set()
    #event = new EventStore()
    #state = {
        shiftKey: false,
        metaKey: false
    }
    constructor (handlers: any) {
        if (handlers.drag) setupMidi(this, 'drag')
    }

    clean () {}
    effect () {
        if (this.config.shared.target) this.bind()
        return () => this.#event.clean()
    }
    bind(...args: any[]) {}
}

class EventStore {
    constructor () {}
    clean () {}
}
