import { useEffect, useCallback, useState, useRef } from 'react'
import { None, NoteNode as NN, NoteGetter, NotePoster, NoteConfig, URL as U, BasicProps } from './types'
import { is, equalPathname } from './utils'
//import useSWR from 'swr'
export const useNote = (
    initGetURL: BasicProps<U|string>,
    initGetter: NoteGetter|null=null,
    initPoster: NotePoster|null=null,
    initNoteConfig: Partial<NoteConfig>={}
) : [ NN, (
        updateGetURL: ((pre:NN)=>None<U|string>)|None<U|string>,
        updateGetter?: NoteGetter|null,
        updateConfig?: Partial<NoteConfig>
    ) => void, (
        updatePoster?: NotePoster|null,
        updateConfig?: Partial<NoteConfig>
    ) => void
] => {
    if (is.fun(initGetURL)) initGetURL = initGetURL()
    if (is.str(initGetURL)) initGetURL = new URL(initGetURL)
    const getURLRef  = useRef<U>()
    const getterRef  = useRef(initGetter)
    const posterRef  = useRef(initPoster)
    const configRef  = useRef(initNoteConfig)
    const isFetching = useRef<boolean>(false)
    const [note,set] = useState<NN>(null)
    //  ************************* 📋 useEffect 📋 *************************  //
    useEffect(() => {
        if (equalPathname(getURLRef.current, initGetURL as U)) return
        getURLRef.current = initGetURL as U
        if  (isFetching.current) return
        else isFetching.current = true;
        if (getterRef.current)
            getterRef.current(getURLRef.current).then((res:any) => {
                setTimeout(() => void (isFetching.current = false), 1000)
                set(pre => res || pre)
            })
    }, [initGetURL])
    //  ************************* 📋 getNote 📋 *************************  //
    //  * getNote("/api/note", fetcher) => refresh note data from url
    //  * getNote(p=>p.next  , fetcher) => add note data from url
    //  ************************* ************** *************************  //
    const getNote = useCallback((updateURL,updateGetter=null,updateConfig={}) => {
        if  (isFetching.current) return
        else isFetching.current = true;
        if (is.fun(updateURL   )) updateURL = updateURL(note);
        if (is.str(updateURL   )) updateURL = new URL(updateURL);
        if (is.nul(updateGetter)) updateGetter = getterRef.current;
        const previousURL = getURLRef.current
        getURLRef.current = updateURL
        getterRef.current = updateGetter
        configRef.current = {...configRef.current, ...updateConfig}
        if (getterRef.current)
            getterRef.current(updateURL).then((res:any) => {
                setTimeout(() => (isFetching.current = false), 1000)
                set(pre => {
                    console.log("update");
                    if (!equalPathname(previousURL, getURLRef.current)) return res
                    const {onChange=null} = configRef.current
                    typeof onChange==="function" && onChange()
                    const diff = pre
                      ? (pre.results||[]).filter((p:any) =>
                      ! (res.results||[]).find((r:any) => r.id===p.id)
                    ) : []
                    return {...res, results:[...diff, ...res.results]}
                })
            })
    }, [note])
    //  ************************* 📋 postNote 📋 *************************  //
    //  ************************* ************** *************************  //
    const postNote = useCallback((updatePoster=null,updateConfig={}) => {
        if  (isFetching.current) return
        else isFetching.current = true;
        if (is.nul(updatePoster)) updatePoster = posterRef.current;
        posterRef.current = updatePoster
        configRef.current = {...configRef.current, ...updateConfig}
        return
    }, [])
    return [note, getNote, postNote]
}
