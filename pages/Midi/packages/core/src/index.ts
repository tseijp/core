
import {MidiKey} from './types'
import {Engine} from './engine/Engine'

export const EngineMap = new Map<MidiKey, any>()

export function registerEngine<Key extends MidiKey>(action: Key, Engine: any) {
    EngineMap.set(action, Engine)
}

export * from './types'
export * from './Controller'
export * from './engine/Engine'
export * from './engine/LpadEngine'
export * from './engine/InputEngine'
export * from './engine/OutputEngine'
