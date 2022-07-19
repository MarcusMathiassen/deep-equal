# @marcm/deep-equal

*Mighty* fast deep equals (~837 bytes gzipped)

## Install
```bash
npm install @marcm/deep-equal
```
```bash
yarn add @marcm/deep-equal
```

## Supports 
- ``Object``
- ``Array``
- ``TypedArray``
- ``RegExp``
- ``Promise``
- ``Date``
- ``NaN``
- ``Set``
- ``Map``
- ``React`` (@marcm/deep-equal/react)

## Benchmark[^1] (from [fast-equals](https://github.com/planttheidea/fast-equals))
[^1]: showing benchmark 'overall averages'. Ran on an M1 Pro (macOS 12.4).
Run yourself by adding [@marcm/deep-equal](https://github.com/MarcusMathiassen/deep-equal) to the [fast-equals](https://github.com/planttheidea/fast-equals) benchmark

| Package | Ops / sec |
| :---        |    ---: |
| **@marcm/deep-equal**      | ``11,294.928`` |
| fast-equals            | ``7,317.215``  |
| deep-eql               | ``4,528.424``  |
| fast-equals (circular) | ``2,966.189``  |
| fast-deep-equal        | ``2,841.046``  |
| react-fast-compare     | ``2,684.473``  |
| nano-equal             | ``1,150.366``  |
| underscore.isEqual     | ``1,107.566``  |
| lodash.isEqual         | ``673.473``    |
| assert.deepStrictEqual | ``30.697``     |
| deep-equal             | ``2.888``      |

Passes the full test suite of [fast-equals](https://github.com/planttheidea/fast-equals)

## Usage
```javascript
const { deepEqual } = require('@marcm/deep-equal')
// or
import { deepEqual } from '@marcm/deep-equal'
// or if being used for React
import { deepEqual } from '@marcm/deep-equal/react'

// Typed Arrays
deepEqual(new Float32Array([3, 4, NaN]), new Float32Array([3, 4, NaN])) // true
deepEqual(new Float32Array([3, 4, NaN]), new Float32Array([3, 4, null])) // false
// Objects and array
deepEqual([{ a: 'a' }, { b: 'b' }], [{ a: 'a' }, { b: 'b' }]) // true
// Dates
deepEqual(new Date('2017-06-16T21:36:48.362Z'), new Date('2016-06-16T21:36:48.362Z')) // false
deepEqual(new Date('2017-06-16T21:36:48.362Z'), new Date('2017-06-16T21:36:48.362Z')) // true
