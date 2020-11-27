import { AxiosResponse } from 'axios'

export type BasicProps<T>  = (()=>T) | T
export type BasicState<T>  = ((pre:T)=>T) | T
export type BasicAction<T> = (fn:BasicState<T>) => void
export type Merge<A,B> = {[K in keyof A]:K extends keyof B ? B[K] : A[K] } & B
export type None<T> = T|undefined|false|null
// ************************* 📅 For useNote 📅 ************************* //
export type URL = {
    hash: string; hostname: string; search    : string;
    host: string; username: string; protocol  : string;
    href: string; password: string; toString(): string;
    port: string; pathname: string; readonly origin: string;
}
export type NoteElement = {
    ja_text :string, author_name:string, note_id:number,
    en_text :string, posted_time:number,      id:number,
    is_author: boolean, [key:string]:any,
}
export type NoteNode = null | {
    [key:string]:any,
    now     :string|null,
    next    :string|null,
    previous:string|null,
    //children: TODO DEV
    results :
      | Partial<NoteElement>[]
      | null
      | undefined
}
//export type NoteURL = URL | string | string[]
export type NoteGetter<T=NoteNode> = (url:URL, headers?:any) => Promise<AxiosResponse<T>>
export type NotePoster<T=NoteNode> = (url:URL, headers?:any) => Promise<AxiosResponse<T>>
export type NoteConfig = {onChange:() => void}

// ************************* 👌 For usePage 👌 ************************* //
export type PageConfig<T={}> = Partial<{
    [key:string]:any,
    onChange:null|(()=>void),
}>
export type DefaultPage<T={}> = {
    [key:string]:any, //config:PageConfig<T>|null, //TODO : DEV
    id:string,language:string,urls:URL[]
    isHome :boolean,protocol:string,hostname:string,hash:string,
    isLocal:boolean,portname:string,pathname:string,search:string,
}
export type MultiPage<T> = {
    [K in keyof T] : null|T[K]
  | ( (p:Page<T>) => null|T[K] )
}
export type Page<T extends {}={}> = Merge<DefaultPage<T>,MultiPage<T>>

// ************************* 🙍‍♂️ For useUser 🙍 ************************* //
export type Credit<T extends object|string=string> = {username:T,password:T,email?:T}
export type User<T extends object|string=string> = {
    username :T, isAuth: boolean,
    authtoken:T, input : { onChange : (e:any)=>void, autoComplete?:"on",
        group   :boolean, value:string, name:string, success ?:"right",
        validate:boolean, label:string, type:string, error?:"wrong",}[]
}
export type UserConfig<T extends object|string=string,U=User<T>> = {
    onSign   :null|((u?:U)=>void), user:null|T,
    onSignin :null|((u?:U)=>void), keys:string[],
    onSignout:null|((u?:U)=>void), [key:string]:any,
}
export type UserSignin = (
    url:URL, credit:Credit, headers?:any
) => Promise<{username:string, authtoken:string}>
