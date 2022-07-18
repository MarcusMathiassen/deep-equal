# @marcm/deep-equal
*Might* be the fastest around (see benchmark below)

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

Passes the full test-suite of [fast-equals](https://github.com/planttheidea/fast-equals)

