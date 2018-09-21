const test = require('tape')
const helpers = require('../test/helpers')

const bindFunc = helpers.bindFunc
const unit = require('../core/_unit')

const unsetPath = require('./unsetPath')

test('unsetPath helper', t => {
  const fn = bindFunc(unsetPath)

  const pathErr = /unsetPath: Non-empty Array of non-empty Strings and\/or Integers required for first argument/

  t.throws(fn(undefined, {}), pathErr, 'throws when first arg is undefined')
  t.throws(fn(null, {}), pathErr, 'throws when first arg is null')
  t.throws(fn(NaN, {}), pathErr, 'throws when first arg is NaN')
  t.throws(fn(0, {}), pathErr, 'throws when first arg is falsey number')
  t.throws(fn(1, {}), pathErr, 'throws when first arg is truthy number')
  t.throws(fn('', {}), pathErr, 'throws when first arg is falsey string')
  t.throws(fn('string', {}), pathErr, 'throws when first arg is truthy string')
  t.throws(fn(false, {}), pathErr, 'throws when first arg is false')
  t.throws(fn(true, {}), pathErr, 'throws when first arg is true')
  t.throws(fn(unit, {}), pathErr, 'throws when first arg is a function')
  t.throws(fn({}, {}), pathErr, 'throws when first arg is an object')
  t.throws(fn([], {}), pathErr, 'throws when first arg is an empty array')

  t.throws(fn([ undefined ], {}), pathErr, 'throws with undefined in path')
  t.throws(fn([ null ], {}), pathErr, 'throws with null in path')
  t.throws(fn([ NaN ], {}), pathErr, 'throws with NaN in path')
  t.throws(fn([ false ], {}), pathErr, 'throws with false in path')
  t.throws(fn([ true ], {}), pathErr, 'throws with true in path')
  t.throws(fn([ unit ], {}), pathErr, 'throws with function in path')
  t.throws(fn([ {} ], {}), pathErr, 'throws with object in path')
  t.throws(fn([ [] ], {}), pathErr, 'throws with array in path')

  const noObj = /unsetPath: Object or Array required for second argument/
  t.throws(fn([ 'key' ], undefined), noObj, 'throws when second arg is undefined')
  t.throws(fn([ 'key' ], null), noObj, 'throws when second arg is null')
  t.throws(fn([ 'key' ], NaN), noObj, 'throws when second arg is NaN')
  t.throws(fn([ 'key' ], 0), noObj, 'throws when second arg is falsey number')
  t.throws(fn([ 'key' ], 1), noObj, 'throws when second arg is truthy number')
  t.throws(fn([ 'key' ], ''), noObj, 'throws when second arg is falsey string')
  t.throws(fn([ 'key' ], 'string'), noObj, 'throws when second arg is truthy string')
  t.throws(fn([ 'key' ], false), noObj, 'throws when second arg is false')
  t.throws(fn([ 'key' ], true), noObj, 'throws when second arg is true')
  t.throws(fn([ 'key' ], unit), noObj, 'throws when second arg is a function')

  // const undefs = { a: undefined, b: undefined }
  // t.same(dissoc('', undefs), {}, 'removes undefined values')

  // const defs = { a: 1, b: 2 }
  // t.same(dissoc('', defs), defs, 'empty string returns with nothing removed')
  // t.notEqual(dissoc('', defs), defs, 'returns a new object')
  // t.same(dissoc('a', defs), { b: 2 }, 'returns a new object with specified key removed')

  t.end()
})
