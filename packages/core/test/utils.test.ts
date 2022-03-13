import {
    topUp,samp,getWRate,clamp,swap,
    defaultPage,joinPage,normPage,equalPathname,joinURL
} from '../src/utils'
import {Page} from '../src/types'
//import { mocked } from 'ts-jest/utils'
//jest.mock('./utilsStore')
//describe('*************** FOR COMPONENTS ***************', () => {
describe('topUp', () => {
    test('base', () => {
        expect(topUp("abc")).toBe("Abc");
        expect(topUp("ABC")).toBe("Abc");
        expect(topUp("AbC")).toBe("Abc");
    })
});
describe('samp', () => {
    test('base', () => {
        expect(samp([1,2,3],2  )).toStrictEqual([1,2]);
        expect(samp([1,2,3],4  )).toStrictEqual([1,2,3,1]);
        expect(samp([1,2,3],4,4)).toStrictEqual([1,2,3,4]);
    })
});
describe('getWRate', () => {//
    test('no order', () => {
        expect(getWRate([],5, 0,100)).toStrictEqual([.2,.2,.2,.2,.2]);
        expect(getWRate([],5,20,100)).toStrictEqual([.2,.2,.2,.2,.2]);
    })
    test('width', () => {
        expect(getWRate([1,1,1,1],5,20,100)).toStrictEqual([.2,.2,.2,.2,.2]);
    })
});
describe('clamp', () => {
    test('base', () => {
        expect(clamp( -1,0,1)).toBe(0);
        expect(clamp(0.2,0,1)).toBe(.2);
        expect(clamp(1.5,0,1)).toBe(1);
    })
});
describe('swap', () => {
    test('base', () => {
        expect(swap([0,1,2,3,4],0,4)).toStrictEqual([1,2,3,4,0]);
        expect(swap([0,1,2,3,4],2,3)).toStrictEqual([0,1,3,2,4]);
        expect(swap([0,1,2,3,4],4,1)).toStrictEqual([0,4,1,2,3]);
    })
});
const local = "http://localhost"
describe('equalPathname', () => {
    test('base', () => {
        expect(equalPathname(local, local+"/")).toBe(true)
        expect(equalPathname(local, local+"/api")).toBe(false)
        expect(equalPathname(local+"/api", local+"/api/")).toBe(true)
    })
    test('query', () => {
        expect(equalPathname(local+"?q=0", local+"/?q=1")).toBe(true)
        expect(equalPathname(local+"?q=0", local+"/api?q=1/")).toBe(false)
        expect(equalPathname(local+"/api?q=0", local+"/api/?q=1/")).toBe(true)
    })
})
//})
//describe('*************** FOR USEPAGES ***************', () => {
describe('joinPage', () => {
    test('string'  , () => {
        expect(joinPage({...defaultPage,
            protocol:"http:"    , portname:"8000",
            hostname:"localhost", pathname:"/api/note/3/"
        })).toBe("http://localhost:8000/api/note/3/")
        expect(joinPage({...defaultPage,
            protocol:"https:"   , portname:"3000"    ,
            hostname:"localhost", pathname:"note/3/"
        })).toBe("https://localhost:3000/note/3/")
    })
    test('string[]', () => {
        expect(joinPage({...defaultPage,
            protocol:"http:"    , portname:["8000", "3000"],
            hostname:"localhost", pathname:["/api/note/","note"],
        })).toStrictEqual([
            "http://localhost:8000/api/note/",
            "http://localhost:3000/note"
        ])
        expect(joinPage({...defaultPage,
            protocol:"https:"   , portname:null,
            hostname:"tsei.jp"  , pathname:["api/note/3/","note/3"],
        })).toStrictEqual([
            "https://tsei.jp/api/note/3/",
            "https://tsei.jp/note/3"
        ])
    })
})
describe('normPage', () => {
    const base = () => ({
        ...defaultPage,
        isLocal:true, search:"",
        hostname:"localhost",
        protocol:"http://"  ,
    })
    test('home', () => {
        const page = (_id:string="") : Page<{
            pathname:string[], isHome:boolean,
            portname:string[], isLocal:boolean
        }> => ({...base(),
            isHome :({id}) => !id, id:_id,
            isLocal:({hostname}) => hostname==="localhost",
            portname:["8000","3000"],
            pathname:({id}) =>
               [`/api/note/${id?id+'/':''}`,
                    `/note/${id?id+'/':''}`,]
        })
        expect( normPage(page()) )
           .toStrictEqual({...base(), id:"", isHome:true,
            portname:["8000","3000"],
            pathname:["/api/note/", "/note/"],
            urls:[new URL("http://localhost:8000/api/note/"),
                  new URL("http://localhost:3000/note/")]
        })
        expect( normPage(page("90")) )
          .toStrictEqual({...base(), id:"90", isHome:false,
            portname:["8000","3000"],
            pathname:["/api/note/90/", "/note/90/"],
            urls:[new URL("http://localhost:8000/api/note/90/"),
                  new URL("http://localhost:3000/note/90/")]
        })
    })
    test('sign', () => {
        const page = (sign:string="") : Page<{
            pathname:string, sign:string
        }> => ({...base(),
            portname:"8000", sign,
            pathname:({sign}) => sign==="in"
                ?`/auth`
                :`/api/user`
        })
        expect( normPage(page("in")) )
           .toStrictEqual({...base(),
            portname:"8000", sign:"in", pathname:"/auth",
            urls:[new URL("http://localhost:8000/auth")],
        })
        expect( normPage(page("up")) )
           .toStrictEqual({...base(),
            portname:"8000", sign:"up", pathname:"/api/user",
            urls:[new URL("http://localhost:8000/auth")],
        })
    })
})
//})
//describe('*************** FOR JOIN URL ***************', () => {
describe('joinURL', () => {
    const host = 'http://localhost:3000'
    test('basic', () => {
        expect(joinURL(`${host}/`,'note','3','/')).toBe(`${host}/note/3/`)
        expect(joinURL(host,'/note/','/tseijp/')).toBe(`${host}/note/tseijp/`)
    })
    test('none', () => {
        expect(joinURL(host,'note/','','/')).toBe(`${host}/note/`)
        expect(joinURL(host,'note','','/','')).toBe(`${host}/note/`)
    })
    test('escape', () => {
        expect(joinURL(host,'note/','?q=note')).toBe(`${host}/note?q=note`)
        expect(joinURL(host,'note/','#TOC')).toBe(`${host}/note#TOC`)
    })
})
//})
