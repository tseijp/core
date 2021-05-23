import {is} from './is'

// ************************* 👌 FOR Components 👌 ************************* //
export const topUp = (text=""):string => ""+text.charAt(0).toUpperCase()+""+text.slice(1).toLowerCase()
export const clamp = (x:number, min=0, max=1) :number  => (x<min)?min:(x>max)?max:x
export const range = (x:number, min=0, max=1) :boolean => min < x && x < max
export const swap  = (arr:number[],ind:number,row:number) => {
    const ret = [...arr.slice(0, ind), ...arr.slice(ind+1, arr.length)]
    return [...ret.slice(0, row), ...arr.slice(ind, ind+1), ...ret.slice(row)]
}

// ************************* 🍭 helpers 🍭 ************************* //
// * This function is fork of react-spring
// * Code : https://github.com/pmndrs/react-spring/blob/master/src/shared/helpers.ts
// ************************* *************** ************************* //
export function merge(target: any, lowercase: boolean = true) {
  return (object: object) =>
    (is.arr(object) ? object : Object.keys(object)).reduce(
        (acc: any, element) => {
            const key = lowercase
              ? element[0].toLowerCase() + element.substring(1)
              : element
            acc[key] = target(key)
            return acc
        },
        target
    )
}

// ************************* 🍡 join-url 🍡 ************************* //
// * This function is fork of join-url/urljoin
// * Code : https://github.com/jfromaniello/url-join/blob/master/lib/url-join.js
// ************************* *************** ************************* //
export function joinURL (...strArray:(string|number)[]) : string {
    var resultArray = [];
    if (strArray.length === 0) return ''
    if (typeof strArray[0] !== 'string') throw new TypeError('Url must be string.');
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1)
        strArray[0] = strArray.shift() + strArray[0];
    if (strArray[0].match(/^file:\/\/\//))
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    else
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    strArray = strArray.filter(str=>str!=="")
    for (var i = 0; i < strArray.length; i++) {
        let str = strArray[i];
        if (typeof str === 'number') str = String(str)
        if (typeof str !== 'string') throw new TypeError(`${str} must be a string. Received ${typeof str}`);
        if (str === '') continue;
        if (i > 0) str = str.replace(/^[\/]+/, '');                   //eslint-disable-line
        if (i < strArray.length - 1) str = str.replace(/[\/]+$/, ''); //eslint-disable-line
        else str = str.replace(/[\/]+$/, '/');                        //eslint-disable-line
        resultArray.push(str);
    }
    let str = (resultArray as string[]).join('/');
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');
    let parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');
    return str;
}
