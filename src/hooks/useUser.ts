/** ************************* 🙍‍♂️ USE USER 🙍 *************************
 *  This is a hook to manage user info and API
 *    - const [user, set] = useUser(url, fetcher)
 *    - ```
 *      ```
 *  # ***** useUser API Configs *****
 *  ## Props Values
 *    - `const _ = usePage(@initURL, @initFetcher, @initConifg)`
 *    - @initURL:string
 *    - @initFetcher:function
 *    - @initConfig : {
 *        @
 *      }
 *  ## Return Values
 *    - `const [user, setUser] = useUser(...)`
 *    - @user : {
 *        @username : user name from fetched API e.g. tseijp
 *        @authtoken: user token from cookie
 *        @input    : for input Components
 *       ~@credit   : the value to send at fetching~
 *        @status   : the acton at fetch e.g. IN, UP, OUT or ""
 *        @userlang : user language from window.navigator.language e.g. ja, en
 *      }
 *    - @setUser
 *      `setUser()`       : Toggle fetching
 *      ~`setUser(null)`   : switch status IN->UP or UP->IN~
 *      ~`setUser(boolean)`: switch status '' or IN|UP|OUT~
 *  # TODO : from usePages : add following keys
 ** ************************* ************** *************************/
import {useCallback, useState, useMemo, useRef} from 'react'
import {useCookies} from 'react-cookie'
import {URL,User,UserConfig,UserSignin} from '../types'
import {defaultUserConfig} from '../utils'
export const useUser = (
    initURL :URL,
    initSign:UserSignin,
    initConfig:Partial<UserConfig>=defaultUserConfig // TODO to config.keys.map
) : [ User, {(
    updateURL ?:URL|null,
    updateSignin?:UserSignin|null,
    updateConfig?:Partial<UserConfig>,
) : void } ] => {
    const urlRef    = useRef<URL>(initURL)
    const signinRef = useRef<UserSignin>(initSign)
    const configRef = useRef<UserConfig>({...defaultUserConfig,...initConfig})
    const [cookies, set, del] = useCookies(configRef.current.keys)
    const [credit, setCredit] = useState({username:cookies.username||'',password:'',email:''})
    // ************************* 🙍‍♂️ For setUser 🙍 ************************* //
    const setUser = useCallback((
        updateURL    = null,
        updateSignin = null,
        updateConfig = {}
    ) => {
        const {onSign=null,onSignin=null,onSignout=null,onError=null} = initConfig
        if (updateURL)       urlRef.current = updateURL
        if (updateSignin) signinRef.current = updateSignin
        if (updateConfig) configRef.current = updateConfig
        return (cookies.authtoken)
          ? (del('authtoken',{path:'/'}), onSign&&onSign(), onSignout&&onSignout())
          : signinRef
            .current(urlRef.current, credit)
            .then( (user:{[K in 'username'|'authtoken']:string}) => {
                if (!user.username || !user.authtoken)
                    throw new Error()
                onSign   && onSign()  ; set("username" ,user.username ,{path:'/'});
                onSignin && onSignin(); set("authtoken",user.authtoken,{path:'/'});
            })
            .catch((_:any)=>onError&&onError())
    }, [cookies,set,del,credit,initConfig] )
    // ************************* 🙍‍♂️ For Render 🙍 ************************* //
    const onChange = useCallback(({target}:any) => {
        setCredit(p => ({...p, [target.name]:target.value}) )
    }, [])
    const user = useMemo<User>(() => ({
        username :cookies.username ||'', isAuth:!!cookies.authtoken,
        authtoken:cookies.authtoken||'', input: Object
            .entries({username:'user',password:'lock',email:'envelope'})
            .map(([name,icon]) => ({
                label: `Type your ${name}`, value: (credit as any)[name], name, icon,
                group: true, validate:true, type: name==="username"?"text":name, onChange,
                ...(name==="password"?{autoComplete:"on"}:{error:"wrong",success:"right"})
            }))
    }), [cookies, credit, onChange])
    return [user, setUser]
}
    /*const input = useMemo<User["input"]>(() => Object
        .entries({username:'user',password:'lock',email:'envelope'})
        .map(([name,icon]) => ({
            label: `Type your ${name}`, value: (credit as any)[name], name, icon,
            group: true, validate:true, type: name==="username"?"text":name, onChange,
            ...(name==="password"?{autoComplete:"on"}:{error:"wrong",success:"right"}),
    })), [credit, onChange])
    return [useMemo(() => ({
        username :cookies.username ||'',
        authtoken:cookies.authtoken||'', input,
        //status : sign?"":cookies.authtoken?"OUT":inup
    }), [cookies, input]), setUser]
}*/
