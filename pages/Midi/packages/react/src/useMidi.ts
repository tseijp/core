import {
    MidiConfig,
    MidiHandlers,
    registerEngine,
    InputEngine,
} from '../../core/src'
import { useRecognizers } from './useRecognizers'

export function useMidi<Config extends MidiConfig=MidiConfig>(
    handlers: MidiHandlers,
    config: Config = {} as Config
) {
    registerEngine('input', InputEngine)
    return useRecognizers<Config>(handlers, config)
}
