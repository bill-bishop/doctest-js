/* eslint no-eval: "off", no-console: "off" */
import path from 'path'

export const evalExpression = (evalString, filePath, imports) => {
  try {
    if (filePath !== undefined) {
      // Use __non_webpack_require__ to bypass webpack bundling
      const nodeRequire = typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : require
      const ownExports = nodeRequire(filePath)
      const scope = Object.assign({}, imports, ownExports)
      const scopeKeys = Object.keys(scope)
      const fn = Function.apply(null, scopeKeys.concat(`return ${evalString}`))
      return { result: fn.apply(null, scopeKeys.map(k => scope[k])) }
    } else if (imports !== undefined) {
      const scopeKeys = Object.keys(imports)
      const fn = Function.apply(null, scopeKeys.concat(`return ${evalString}`))
      return { result: fn.apply(null, scopeKeys.map(k => imports[k])) }
    } else {
      const result = eval(evalString)
      return { result }
    }
  } catch (error) {
    return { error }
  }
}

export const evalValue = evalString => {
  const wrappedEvalString = `(${evalString})`
  try {
    return { result: eval(wrappedEvalString) }
  } catch (error) {
    return { error }
  }
}

export default ({ resultString, stringToEval }, filePath, instance, imports) => {
  const fullFilePath = path.join(process.cwd(), filePath).split(path.sep).join('/')
  if (!instance) {
    const actual = evalExpression(resultString, fullFilePath, imports)
    const expected = evalValue(stringToEval)
    return { actual, expected }
  } else {
    const result = eval(`instance.${resultString};`)
    const actual = { result }
    const expected = evalValue(stringToEval)
    return { actual, expected }
  }
}
