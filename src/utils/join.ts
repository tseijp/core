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
