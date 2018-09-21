/** @license ISC License (c) copyright 2018 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

const curry = require('../core/curry')
const isArray = require('../core/isArray')
const isEmpty = require('../core/isEmpty')
const isInteger  = require('../core/isInteger')
const isObject  = require('../core/isObject')
const isString = require('../core/isString')
const object = require('../core/object')

const pathError =
  'unsetPath: Non-empty Array of non-empty Strings and/or Integers required for first argument'

function unset(key, obj) {
  return function(acc, k) {
    if(obj[k] !== undefined || k === key) {
      acc[k] = obj[k]
    }
    return acc
  }
}

function unsetPath(path, obj) {
  if(!isArray(path) || isEmpty(path)) {
    throw new TypeError(pathError)
  }

  if(!(isObject(obj) || isArray(obj))) {
    throw new TypeError('unsetPath: Object or Array required for second argument')
  }

  const key = path[0]

  if(path.length === 1) {
    if(!(isString(key) || isInteger(key))) {
      throw new TypeError(pathError)
    }

    return Object.keys(obj).reduce(unset(key, obj), {})
  }

  return object.assign(obj, unsetPath(path.slice(1), obj[key]))
}

module.exports = curry(unsetPath)
