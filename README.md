# @marcm/deep-equal
*Might* be the fastest around (see benchmark below)

## Install
```bash
npm install @marcm/deep-equal
```
```bash
yarn add @marcm/deep-equal
```

## Supports 
- Objects
- Arrays
- TypedArrays
- RegExp
- Promises
- Dates
- NaN equals NaN
- Sets
- Maps
- React (use @marcm/deep-equal/react)

## Usage
```javascript
const { deepEqual } = require('@marcm/deep-equal')
// or 
import { deepEqual } from '@marcm/deep-equal'
// or if being used for React
import { deepEqual } from '@marcm/deep-equal/react'

```


## Benchmark[^1] (from [fast-equals](https://github.com/planttheidea/fast-equals))
[^1]: Showing 'overall averages' with no tests filtered. Ran on an M1 Pro (macOS 12.4).

| Package | Ops / sec |
| :---        |    ---: |
| @marcm/deep-equal | 9,848.200 |
| fast-equals | 7,255.689 |
| fast-equals (circular) | 3,103.426 |
| deep-eql               | 2,998.862 |
| fast-deep-equal        | 2,743.475 |
| react-fast-compare     | 2,627.916 |
| nano-equal             | 1,151.799 |
| underscore.isEqual     | 1,061.762 |
| lodash.isEqual         | 636.602   |
| assert.deepStrictEqual | 29.661    |
| deep-equal             | 2.745     |

Passes the full test suite of [fast-equals](https://github.com/planttheidea/fast-equals)

## Example
```javascript
// Typed Arrays
deepEqual(new Float32Array([3, 4, NaN]), new Float32Array([3, 4, NaN])) // true
deepEqual(new Float32Array([3, 4, NaN]), new Float32Array([3, 4, null])) // false
// Objects and array
deepEqual([{ a: 'a' }, { b: 'b' }], [{ a: 'a' }, { b: 'b' }]) // true
// Dates
deepEqual(new Date('2017-06-16T21:36:48.362Z'), new Date('2016-06-16T21:36:48.362Z')) // false
deepEqual(new Date('2017-06-16T21:36:48.362Z'), new Date('2017-06-16T21:36:48.362Z')) // true
//...
```
