import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Page} from '../src/types'
import {useNote, usePage, useUser} from '../src/hooks'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
// ************************* 👌 use-page 👌 ************************* //
const TestPage = ({testPage={}}) =>  {
    const [page, set] = usePage(testPage)
    const onClick = () => set({id:"2"})
    const children = page.urls.map(u=>u.href).join(' and ')
    return <button {...{onClick, children}}/>
}
describe('usePage', () => {
    const base = {protocol:'http:',hostname:'localhost',portname:'3000', search:'',}
    test('single set', async () => {
        const pathname = ({id}:any) => `/${id&&id+'/'}`
        const testPage:Partial<Page<{pathname:string}>> = {...base, pathname, id:''}
        const {getByRole, findByText} = render(<TestPage {...{testPage}}/>)
        await findByText('http://localhost:3000/')
        fireEvent.click(getByRole('button'))
        await findByText('http://localhost:3000/2/')
    })
    test('multi set', async () => {
        const pathname = ({id}:any) => [`/${id&&id+'/'}`, `/api/${id&&id+'/'}`]
        const testPage:Partial<Page<{pathname:string[]}>> = {...base, pathname, id:''}
        const {getByRole, findByText} = render(<TestPage {...{testPage}}/>)
        await findByText('http://localhost:3000/ and http://localhost:3000/api/')
        fireEvent.click(getByRole('button'))
        await findByText('http://localhost:3000/2/ and http://localhost:3000/api/2/')
    })
})

// ************************* 📅 For useNote 📅 ************************* //
const TestNote = ({host,fetcher}:any) => {
    const [note, set] = useNote(host, fetcher)
    const onClick =()=> note && note.next && (console.log("set"), set(note.next))
    const children = note?.results?.map((n:any)=>n.id).join(';')
    return <button {...{onClick, children}} />
}
describe('useNote', () => {
    afterEach(() => jest.restoreAllMocks() )
    test('fetch in home', async () => {
        const host = "http://localhost:3000/api"
        const next = `${host}?cursor=c0glsl`
        const previous = null
        //const response = async (resultx,y,s) => Promise.resolve({next,previous,results})
        //    .then((res)=>{console.log("fetched"); return res})
        mockAxios.get
        // TODO double fetching
        //    .mockImplementationOnce(() => response([0,1,2].map(id=>({id}))) )
        //    .mockImplementationOnce(() => response([0,1,2].map(id=>({id}))) )
            .mockResolvedValue({next,previous,results:[0,1,2].map(id=>({id}))})
        const fetcher = async (..._:any) => mockAxios.get("", {} as any)
        const {findByText} = render(<TestNote {...{host,fetcher}}/>)
        await findByText("0;1;2") // fireEvent.click(getByRole('button'))
    })
    // test('edit', () => {})
})

// ************************* 🙍‍♂️ For useUser 🙍 ************************* //
const TestUser = ({host, fetcher}:any) => {
   const [user, set] = useUser(host, fetcher)
   const onClick = () => set()
   const children = `${user.username||"none"} and ${user.authtoken||"none"}`
    return (
        <>{user.input.map(({name,value,onChange},key) =>
            <input {...{key,name,value,onChange}} aria-label={name}/> )}
            <button {...{onClick,children}} />
        </>
    )
}
describe('useUser', () => {
    beforeEach(() => {
        Cookies.set("username" ,"anonimous")
        Cookies.set("authtoken","xxxxxxxx")
    })
    afterEach(() => jest.restoreAllMocks() )
    const setup = () => {
        const host = "http://localhost:3000/api"
        const fetcher = async () => mockAxios.get("", {} as any)
        const utils = render(<TestUser {...{host,fetcher}}/>)
        return {  ...utils,
            username:utils.getByLabelText("username"),
            password:utils.getByLabelText("password"),
            email   :utils.getByLabelText("email"),
            target  :(value="",name="") => ({target:{value,name}})
        }
    }
    test('base', async () => {
        mockAxios.get.mockResolvedValue({username:"username",authtoken:"yyyyyyyy"})
        const {getByRole,findByText,username,password,email,target} = setup()
        await findByText('anonimous and xxxxxxxx')
        fireEvent.click(getByRole('button'))
        expect(Cookies.get("username" )).toBe("anonimous")
        expect(Cookies.get("authtoken")).toBe(undefined)
        await findByText('anonimous and none')
        act(() => {
            fireEvent.change(username!, target("username","username"))
            fireEvent.change(password!, target("yyyyyyyy","password"))
            fireEvent.change(   email!, target("zzzzzzzz","email"   ))
            fireEvent.click (getByRole('button'))
        })
        await findByText('username and yyyyyyyy')
        expect(Cookies.get("username" )).toBe("username")
        expect(Cookies.get("authtoken")).toBe("yyyyyyyy")
        // expect(username).toHaveTextContent("username")
        // expect(password).toHaveTextContent("yyyyyyyy")
        // expect(email   ).toHaveTextContent("zzzzzzzz")
    })
})
/*
// const [page, setPage] = usePage<TestPage>(testPage)
// const [note, setNote] = useNote(page.urls[1], testFetcher)
// const [user, setUser] = useUser(page.urls[2], testSignin)
*/
