
export type MidiKey = 'input' | 'output' | 'message' | 'access' | 'connection'

export type MidiState<Key extends MidiKey> = {
    key: Key,
    inputing?: boolean,
    outputing?: boolean,
    messaging?:boolean,
    accessing?: boolean,
    connectioning?: boolean,
}

export type MidiConfig = {
    target?: any
}

export type EventTypes = {
    input: any,
    output: any,
    message: any,
    access: any,
    conection: any
}

export type Handler<Key extends MidiKey, EnentType=Exclude<EventTypes, Key>> = (
    state: Omit<MidiState<Key>, 'event'>
) => any | void

export type UserHandlers = {
    onInput: Handler<'input'>,
    onInputEnd: Handler<'input'>,
    onInputStart: Handler<'input'>,
    onOutput: Handler<'output'>,
    onOutputEnd: Handler<'output'>,
    onOutputStart: Handler<'output'>,
    onMessage: Handler<'message'>,
    onMessageEnd: Handler<'message'>,
    onMessageStart: Handler<'message'>,
    onAccess: Handler<'access'>,
    onAccessEnd: Handler<'access'>,
    onAccessStart: Handler<'access'>,
    onConnection: Handler<'connection'>,
    onConnectionEnd: Handler<'connection'>,
    onConnectionStart: Handler<'connection'>,
}

export type MidiHandlers = Partial<UserHandlers>

export type NativeHandlers = Partial<{}>
