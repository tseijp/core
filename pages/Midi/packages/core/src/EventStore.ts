import type { Controller } from './Controller'

export class EventStore {
    #listeners: (() => void)[] = []
    #ctrl: Controller
        constructor(ctrl: Controller) {
        this.#ctrl = ctrl
    }

    add (
        element: EventTarget,
        device: string,
        action: string,
        handler: (event: any) => void,
        options?: AddEventListenerOptions
    ) {
        const type = ""//toDomEventType(device, action)
        const eventOptions = options || this.#ctrl.config.shared.eventOptions
        element.addEventListener(type, handler, eventOptions)
        this.#listeners.push(() => element.removeEventListener(type, handler, eventOptions))
    }

    clean() {
        this.#listeners.forEach((remove) => remove())
        this.#listeners = []
    }
}
