import {Engine} from './Engine'

export class OutputEngine extends Engine<'input'> {
    constructor (...args: [any,any,any]) {
        super(...args)
    }
}
