// ************************* 🍭 helpers 🍭 ************************* //
// * This function is fork of react-spring
// * Code : https://github.com/pmndrs/react-spring/blob/master/src/shared/helpers.ts
// ************************* *************** ************************* //
import {is} from './is'

export function merge (target: any, lowercase: boolean = true) {
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
