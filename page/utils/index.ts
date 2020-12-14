import axios  from 'axios'
import {Credit, URLType, Page} from '@tsei/note'
import * as CODES from '../codes'
import {topUp} from '../../src'
// *************************📋 FOR NOTE 📋************************* //
export * from './serviceWorker'
export const scrollTop=()=>document.getElementById('root')?.scroll({top:0,left:0,behavior:'smooth',});
export const pageConfig = { onChange:() => scrollTop() }
export type CustomPage =
   {portname:string[], isHome:boolean,
    pathname:string[], status:string, }
export const customPage : Partial<Page<CustomPage>> = {
    isSign:false,status:"", portname: ({isLocal}) => isLocal?["3000","8000","8000"]:[],
    isHome:({id}) => !id  , pathname: ({id,status}) =>
        [   `/note/${ id?id+'/':'' }`,
        `/api/note/${ id?id+'/':'' }`,
        status!=="UP"? `/auth/`: `/api/user/`]
}
export const fetcher = async (URL:URLType,headers={'Content-Type':'application/json'}) =>
   axios.get(URL.href, {headers})
        .then(res => {
            if(!res || res.status!==200)
                throw new Error('Bad Request')
            return res.data
        })
export const signin = async (URL:URLType, cred:Credit, headers={'Content-Type':'application/json'}) =>
   axios.post(URL.href, cred, {headers})
        .then((res) => {
            if (res.status>201 || !res.data.token)
                throw new Error('Bad Request')
            return {username:cred.username, authtoken:res.data.token}
        })

// *************************🤏 FOR HOOK 🤏************************* //
export const hookTree = [
    ["Components","Card","Grow",],//"Head","Icon"],
    ["Containers","Notes","Split","Trees"],
    ["Mesh","Kinect","Model","Motion"],
]
export type  HookPage = {pathname:string, Hook:any, code:any, codes:any}
const getval = (obj={},key='') => key in obj ? (obj as any)[key] : ""
export const hookPage = {
    pathname: ({id=""}) => `/hook/${id}`,
    Hook : ({id="",codes={}}) => getval(codes, 'Hook' + topUp(id)), //'page' +
    code : ({id="",codes={}}) => getval(codes, 'code' + topUp(id)),
    codes: Object.assign({}, ...Object.entries(CODES).map(([k,v])=>({[k]:v})))
}
