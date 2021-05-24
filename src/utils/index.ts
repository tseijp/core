export * from './is'
export * from './join'
export * from './log'
export * from './merge'
// ************************* 👌 FOR Components 👌 ************************* //
export const topUp = (text=""):string => ""+text.charAt(0).toUpperCase()+""+text.slice(1).toLowerCase()
export const clamp = (x:number, min=0, max=1) :number  => (x<min)?min:(x>max)?max:x
export const range = (x:number, min=0, max=1) :boolean => min < x && x < max
export const swap  = (arr:number[],ind:number,row:number) => {
    const ret = [...arr.slice(0, ind), ...arr.slice(ind+1, arr.length)]
    return [...ret.slice(0, row), ...arr.slice(ind, ind+1), ...ret.slice(row)]
}
