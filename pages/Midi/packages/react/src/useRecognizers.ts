import React from 'react'
import {
    MidiKey,
    MidiConfig,
    MidiHandlers,
    NativeHandlers,
    Controller
} from '../../core/src'

export function useRecognizers<Config extends MidiConfig>(
    handlers: MidiHandlers,
    config: Config = {} as Config,
    gestureKey?: MidiKey,
    nativeHandlers?: NativeHandlers
): any {
    const ctrl = React.useMemo(() => new Controller(handlers), [])
    // ctrl.applyHandlers(handlers, nativeHandlers)
    // ctrl.applyConfig(config, gestureKey)

    React.useEffect(ctrl.effect.bind(ctrl))
    React.useEffect(() => ctrl.clean.bind(ctrl), [])

    if (config.target === undefined) {
        return ctrl.bind.bind(ctrl) as any
    }
    return undefined as any
}
